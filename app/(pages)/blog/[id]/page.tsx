import type { Metadata } from "next";
import { DEFAULT_MEDIUM_SOURCE, fetchMediumFeed, pickArticleById, extractArticleId, resolveArticleUrl } from "@/app/utils/medium";
import { notFound, redirect } from "next/navigation";
import { generatePageMetadata } from "@/app/utils/seo";
import { getLocale } from "next-intl/server";
import { defaultLocale, type Locale } from "@/i18n";

interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
  searchParams?: { source?: string } | Promise<{ source?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const source = resolvedSearchParams.source ?? DEFAULT_MEDIUM_SOURCE;
  const locale = (await getLocale().catch(() => defaultLocale)) as Locale;

  try {
    const { articles } = await fetchMediumFeed(source, 10);
    const article = pickArticleById(articles, id);

    if (article) {
      return generatePageMetadata({
        title: article.title || "Blog Article",
        description: article.summary || "Read the latest from PSTAKE Research",
        path: `/blog/${id}`,
        locale,
        type: "article",
      });
    }
  } catch (error) {
    console.error("Failed to generate metadata for blog article", error);
  }

  // 默认元数据
  const defaultDescriptions: Record<Locale, string> = {
    en: "Read the latest from PSTAKE Research",
    cn: "阅读 PSTAKE Research 的最新内容",
    kr: "PSTAKE Research의 최신 콘텐츠 읽기",
  };

  return generatePageMetadata({
    title: "Blog Article",
    description: defaultDescriptions[locale],
    path: `/blog/${id}`,
    locale,
    type: "article",
  });
}

export default async function BlogArticlePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const source = resolvedSearchParams.source ?? DEFAULT_MEDIUM_SOURCE;

  try {
    const { articles } = await fetchMediumFeed(source, 10);
    const article = pickArticleById(articles, id);
    if (!article) {
      notFound();
    }
    redirect(resolveArticleUrl(article, source));
  } catch (error) {
    console.error("Failed to load Medium detail", error);
  }

  notFound();
}

export async function generateStaticParams() {
  try {
    const { articles } = await fetchMediumFeed(DEFAULT_MEDIUM_SOURCE, 10);
    return articles.map((a) => ({ id: extractArticleId(a) }));
  } catch {
    return [];
  }
}
