import Parser from "rss-parser";

export interface MediumArticle {
  title: string;
  link: string;
  guid: string;
  pubDate: string | null;
  author: string | null;
  categories: string[];
  coverImage: string | null;
  summary: string | null;
  content: string | null;
}

export interface MediumFeedResponse {
  feed: {
    title: string | null;
    link: string | null;
    description: string | null;
    lastBuildDate: string | null;
  };
  articles: MediumArticle[];
}

const ENV_DEFAULT_SOURCE = (process.env.NEXT_PUBLIC_MEDIUM_SOURCE || process.env.MEDIUM_SOURCE || "").trim();
export const DEFAULT_MEDIUM_SOURCE = ENV_DEFAULT_SOURCE || "jamievaron";

export function extractArticleId(article: Pick<MediumArticle, "guid" | "link">): string {
  const candidate = article.guid || article.link || "";
  try {
    const url = new URL(candidate, "https://medium.com");
    const parts = url.pathname.split("/").filter(Boolean);
    return parts.pop() || candidate;
  } catch {
    return candidate;
  }
}

export function resolveArticleUrl(article: Pick<MediumArticle, "guid" | "link">, source = DEFAULT_MEDIUM_SOURCE): string {
  const candidates = [article.link, article.guid].filter(Boolean) as string[];
  for (const candidate of candidates) {
    try {
      const url = new URL(candidate);
      return url.toString();
    } catch {
      continue;
    }
  }

  const id = extractArticleId(article);
  const handle = normalizeHandle(source);
  if (!id) {
    return `https://medium.com/@${handle}`;
  }
  return `https://medium.com/@${handle}/${id}`;
}

export function stripHtml(html: string | null | undefined, maxLength = 140): string {
  if (!html) return "";
  const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength)}…`;
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const FEED_REQUEST_MAX_RETRIES = 3;
const FEED_REQUEST_BACKOFF_MS = 800;
// 1 小时缓存，避免频繁拉取；过期后才更新
const FEED_CACHE_TTL_MS = 60 * 60 * 1000;
const SOURCE_CACHE_TTL_MS = FEED_CACHE_TTL_MS * 5;
const JSON_PREFIX = /^\)\]\}while\(1\);<\/x>/;

interface MediumLatestPost {
  id?: string;
  uniqueSlug?: string;
  creatorId?: string;
  title?: string;
  firstPublishedAt?: number;
  virtuals?: {
    subtitle?: string;
    snippet?: string;
    previewImage?: { imageId?: string };
    tags?: Array<{ name?: string }>;
  };
  content?: { subtitle?: string };
}

interface MediumLatestPayload {
  payload?: {
    references?: {
      Post?: Record<string, MediumLatestPost>;
      User?: Record<string, { name?: string }>;
    };
    collection?: { name?: string; description?: string };
  };
}

interface MediumFeedItem {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  creator?: string;
  categories?: string[];
  enclosure?: { url?: string; type?: string };
  description?: string;
  contentSnippet?: string;
  "content:encoded"?: string;
  content?: string;
  summary?: string;
}

function normalizeHandle(rawSource: string): string {
  const trimmed = (rawSource || DEFAULT_MEDIUM_SOURCE).trim();
  if (!trimmed) return DEFAULT_MEDIUM_SOURCE.replace(/^@/, "");
  return trimmed.replace(/^@+/, "").split(/[/?#]/)[0] || DEFAULT_MEDIUM_SOURCE.replace(/^@/, "");
}

function buildFeedUrl(rawSource: string): string {
  const source = rawSource.trim();
  if (!source) return buildFeedUrl(DEFAULT_MEDIUM_SOURCE);
  if (source.startsWith("http://") || source.startsWith("https://")) {
    const url = new URL(source);
    return url.toString();
  }
  if (source.startsWith("@")) {
    return `https://medium.com/feed/${source}`;
  }
  if (source.includes(".")) {
    return source.endsWith("/feed") ? source : `${source.replace(/\/$/, "")}/feed`;
  }
  return `https://medium.com/${source.replace(/^\/+|\/+$/g, "")}/feed`;
}

function buildFallbackFeedUrls(rawSource: string): string[] {
  const source = rawSource.trim();
  if (!source) return [];
  const normalized = source.replace(/^@/, "");
  const fallbacks = new Set<string>();

  if (source.startsWith("@")) {
    fallbacks.add(`https://${normalized}.medium.com/feed`);
  } else if (!source.includes(".") && !source.startsWith("http://") && !source.startsWith("https://")) {
    fallbacks.add(`https://medium.com/feed/@${normalized}`);
    fallbacks.add(`https://${normalized}.medium.com/feed`);
  }

  return Array.from(fallbacks);
}

function buildMediumImageUrl(imageId?: string | null): string | null {
  if (!imageId) return null;
  return `https://miro.medium.com/v2/resize:fit:1100/${imageId}`;
}

function normalizeItem(item: MediumFeedItem): MediumArticle {
  const fullContent = item["content:encoded"] ?? item.content ?? null;
  const summary = item.contentSnippet ?? item.summary ?? item.description ?? null;
  const inlineImage = extractFirstImage(fullContent ?? summary ?? "");
  return {
    title: item.title ?? "Untitled",
    link: item.link ?? item.guid ?? "",
    guid: item.guid ?? item.link ?? "",
    pubDate: item.pubDate ?? null,
    author: item.creator ?? null,
    categories: item.categories ?? [],
    coverImage: item.enclosure?.url ?? inlineImage ?? null,
    summary,
    content: fullContent,
  };
}

function extractFirstImage(html: string | null | undefined): string | undefined {
  if (!html) return undefined;
  const match = /<img[^>]+src=["']([^"']+)["']/i.exec(html);
  return match?.[1];
}

async function fetchMediumLatestJson(source: string, limit: number): Promise<MediumFeedResponse> {
  const handle = normalizeHandle(source);
  const url = `https://medium.com/@${handle}/latest?format=json`;
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; pstake-site/1.0; +https://pstake.finance)",
      Accept: "application/json,text/plain,*/*",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  let text = await res.text();
  text = text.replace(JSON_PREFIX, "");
  const json = JSON.parse(text) as MediumLatestPayload;
  const payload = json.payload;
  const postsRef = payload?.references?.Post ?? {};
  const usersRef = payload?.references?.User ?? {};
  const posts = Object.values(postsRef);
  if (!posts.length) throw new Error("Medium latest feed empty");

  posts.sort((a, b) => (b.firstPublishedAt ?? 0) - (a.firstPublishedAt ?? 0));
  const selected = posts.slice(0, limit);

  const articles: MediumArticle[] = selected.map((post) => {
    const author = post.creatorId ? usersRef?.[post.creatorId]?.name ?? null : null;
    const coverImage = buildMediumImageUrl(post?.virtuals?.previewImage?.imageId);
    const link = `https://medium.com/@${handle}/${post.uniqueSlug ?? post.id}`;
    const guid = post.id ?? post.uniqueSlug ?? link;
    const categories = (post?.virtuals?.tags ?? [])
      .map((tag) => tag?.name)
      .filter((tag): tag is string => Boolean(tag));

    return {
      title: post.title ?? post?.virtuals?.subtitle ?? "Untitled",
      link,
      guid,
      pubDate: post.firstPublishedAt ? new Date(post.firstPublishedAt).toUTCString() : null,
      author,
      categories,
      coverImage,
      summary: post?.virtuals?.snippet ?? post?.content?.subtitle ?? post?.virtuals?.subtitle ?? null,
      content: null,
    };
  });

  return {
    feed: {
      title: payload?.collection?.name ?? `@${handle} on Medium`,
      link: `https://medium.com/@${handle}`,
      description: payload?.collection?.description ?? null,
      lastBuildDate: new Date().toUTCString(),
    },
    articles,
  };
}

async function fetchMediumFeedUncached(source = DEFAULT_MEDIUM_SOURCE, limit = 30): Promise<MediumFeedResponse> {
  const parser = new Parser<MediumFeedItem>({ timeout: 15000 });
  const candidateUrls = Array.from(new Set([buildFeedUrl(source), ...buildFallbackFeedUrls(source)].filter(Boolean)));

  const UA = "Mozilla/5.0 (compatible; pstake-site/1.0; +https://pstake.finance)";
  const ACCEPT = "application/rss+xml,application/xml;q=0.9,*/*;q=0.8";

  async function fetchXml(url: string) {
    for (let attempt = 0; attempt < FEED_REQUEST_MAX_RETRIES; attempt += 1) {
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": UA, Accept: ACCEPT },
      });
      if (res.ok) return await res.text();

      const retryable = res.status === 429 || (res.status >= 500 && res.status < 600);
      if (!retryable || attempt === FEED_REQUEST_MAX_RETRIES - 1) {
        throw new Error(`HTTP ${res.status}`);
      }
      const wait = FEED_REQUEST_BACKOFF_MS * (attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, wait));
    }

    throw new Error("Unable to fetch Medium feed");
  }

  let lastError: unknown;
  for (const url of candidateUrls) {
    try {
      const xml = await fetchXml(url);

      try {
        type ParsedFeed = {
          items?: MediumFeedItem[];
          title?: string;
          link?: string;
          description?: string;
          lastBuildDate?: string;
        };
        const feed = (await parser.parseString(xml)) as unknown as ParsedFeed;
        const items = (feed.items ?? []).slice(0, limit);
        const payload: MediumFeedResponse = {
          feed: {
            title: feed.title ?? null,
            link: feed.link ?? url,
            description: feed.description ?? null,
            lastBuildDate: feed.lastBuildDate ?? null,
          },
          articles: items.map(normalizeItem),
        };

        // 如果 RSS 返回数量少于 limit，尝试补全 latest JSON 数据以拿更多文章
        if ((payload.articles?.length ?? 0) < limit) {
          try {
            const latest = await fetchMediumLatestJson(source, limit);
            const seen = new Set(payload.articles.map((a) => a.guid || a.link));
            const merged = [
              ...payload.articles,
              ...latest.articles.filter((a) => {
                const key = a.guid || a.link;
                if (!key || seen.has(key)) return false;
                seen.add(key);
                return true;
              }),
            ].slice(0, limit);
            payload.articles = merged;
          } catch (supplementError) {
            console.warn('[Medium] Unable to supplement articles via latest JSON:', supplementError);
          }
        }

        return payload;
      } catch (parseError) {
        lastError = parseError;
      }
    } catch (requestError) {
      lastError = requestError;
    }
  }

  try {
    return await fetchMediumLatestJson(source, limit);
  } catch (jsonError) {
    lastError = jsonError;
  }

  const fallbackError = lastError ?? new Error("Unable to fetch Medium RSS feed");
  throw fallbackError;
}

const lastSourceCache = new Map<string, { expiresAt: number; data: MediumFeedResponse }>();
const feedCache = new Map<string, { expiresAt: number; data: MediumFeedResponse }>();
const feedInFlight = new Map<string, Promise<MediumFeedResponse>>();

export async function fetchMediumFeed(source = DEFAULT_MEDIUM_SOURCE, limit = 30): Promise<MediumFeedResponse> {
  const key = `${source}|${limit}`;
  const now = Date.now();
  const cached = feedCache.get(key);

  if (cached && cached.expiresAt > now) {
    console.log(`[medium-feed] Cache hit for ${key}`);
    return cached.data;
  }

  const inflight = feedInFlight.get(key);
  if (inflight) {
    console.log(`[medium-feed] Reusing in-flight fetch for ${key}`);
    return inflight;
  }

  const fetchPromise = fetchMediumFeedUncached(source, limit)
    .then((data) => {
      feedInFlight.delete(key);
      feedCache.set(key, { expiresAt: now + FEED_CACHE_TTL_MS, data });
      return data;
    })
    .catch((error) => {
      feedInFlight.delete(key);
      if (cached) {
        console.warn(`[medium-feed] Fetch failed, serving stale cache for ${key}:`, error);
        return cached.data;
      }
      throw error;
    });

  feedInFlight.set(key, fetchPromise);
  return fetchPromise;
}

export function pickArticleById(articles: MediumArticle[], id: string): MediumArticle | undefined {
  return articles.find((a) => extractArticleId(a) === id);
}
