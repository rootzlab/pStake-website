/**
 * MediumAPI 客户端
 * 使用 RapidAPI 提供的 Medium API (https://mediumapi.com/)
 * 文档: https://docs.mediumapi.com/
 */

// MediumAPI 响应类型定义
export interface MediumApiArticle {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  published_at: string; // YYYY-MM-DD hh:mm:ss
  last_modified_at?: string;
  image_url?: string;
  claps?: number;
  voters?: number;
  word_count?: number;
  reading_time?: number; // 分钟数
  response_count?: number;
  tags?: string[];
  topics?: string[];
  url: string;
  unique_slug?: string;
  language?: string;
}

export interface MediumApiUserArticlesResponse {
  id: string;
  associated_articles: string[][]; // 文章 ID 列表
  count: number;
  total_pinned_articles?: number;
  next?: string; // 分页令牌
}

export interface MediumApiUserIdResponse {
  id: string;
}

// 错误类型
export class MediumApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isQuotaExceeded: boolean = false
  ) {
    super(message);
    this.name = 'MediumApiError';
  }
}

const RAPIDAPI_BASE_URL = 'https://medium2.p.rapidapi.com';
const RAPIDAPI_HOST = 'medium2.p.rapidapi.com';
const REQUEST_TIMEOUT = 10000; // 10 秒超时

/**
 * 创建带超时的 fetch 请求
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new MediumApiError('Request timeout', undefined, false);
    }
    throw error;
  }
}

/**
 * 获取用户 ID
 * @param username Medium 用户名（不带 @ 符号）
 * @returns 用户 ID
 */
export async function getMediumUserId(
  username: string
): Promise<string | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new MediumApiError('RAPIDAPI_KEY not configured');
  }

  const url = `${RAPIDAPI_BASE_URL}/user/id_for/${username}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    if (response.status === 429) {
      throw new MediumApiError('API quota exceeded', 429, true);
    }

    if (!response.ok) {
      throw new MediumApiError(
        `Failed to get user ID: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const data: MediumApiUserIdResponse = await response.json();
    return data.id;
  } catch (error) {
    if (error instanceof MediumApiError) {
      throw error;
    }
    throw new MediumApiError(
      `Failed to fetch user ID: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * 获取用户文章 ID 列表
 * @param userId 用户 ID
 * @param limit 限制返回的文章数量（可选，最多 250 篇/次）
 * @returns 文章 ID 数组
 */
export async function getMediumUserArticleIds(
  userId: string,
  limit?: number
): Promise<string[]> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new MediumApiError('RAPIDAPI_KEY not configured');
  }

  const url = `${RAPIDAPI_BASE_URL}/user/${userId}/articles`;

  try {
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    if (response.status === 429) {
      throw new MediumApiError('API quota exceeded', 429, true);
    }

    if (!response.ok) {
      throw new MediumApiError(
        `Failed to get user articles: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const data: MediumApiUserArticlesResponse = await response.json();

    // 扁平化文章 ID 数组
    const articleIds = data.associated_articles.flat();

    // 如果有限制，返回前 N 篇
    return limit ? articleIds.slice(0, limit) : articleIds;
  } catch (error) {
    if (error instanceof MediumApiError) {
      throw error;
    }
    throw new MediumApiError(
      `Failed to fetch user articles: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * 获取单篇文章详情
 * @param articleId 文章 ID
 * @returns 文章详情
 */
export async function getMediumArticle(
  articleId: string
): Promise<MediumApiArticle | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new MediumApiError('RAPIDAPI_KEY not configured');
  }

  const url = `${RAPIDAPI_BASE_URL}/article/${articleId}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    if (response.status === 429) {
      throw new MediumApiError('API quota exceeded', 429, true);
    }

    if (!response.ok) {
      throw new MediumApiError(
        `Failed to get article: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const data: MediumApiArticle = await response.json();
    return data;
  } catch (error) {
    if (error instanceof MediumApiError) {
      throw error;
    }
    throw new MediumApiError(
      `Failed to fetch article: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * 批量获取文章详情（并发请求）
 * @param articleIds 文章 ID 数组
 * @param concurrency 并发请求数（默认 5）
 * @returns 文章详情数组
 */
export async function getMediumArticlesBatch(
  articleIds: string[],
  concurrency: number = 5
): Promise<MediumApiArticle[]> {
  const results: MediumApiArticle[] = [];
  const errors: string[] = [];

  // 分批并发请求
  for (let i = 0; i < articleIds.length; i += concurrency) {
    const batch = articleIds.slice(i, i + concurrency);
    const promises = batch.map(id =>
      getMediumArticle(id)
        .then(article => article)
        .catch(error => {
          errors.push(`Article ${id}: ${error.message}`);
          return null;
        })
    );

    const batchResults = await Promise.all(promises);
    results.push(...batchResults.filter((article): article is MediumApiArticle => article !== null));
  }

  // 如果所有请求都失败，抛出错误
  if (results.length === 0 && errors.length > 0) {
    throw new MediumApiError(`All article requests failed: ${errors.join('; ')}`);
  }

  return results;
}

/**
 * 获取用户的所有文章（完整流程）
 * @param username Medium 用户名
 * @param limit 限制返回的文章数量（可选）
 * @returns 文章详情数组
 */
export async function getMediumUserArticles(
  username: string,
  limit?: number
): Promise<MediumApiArticle[]> {
  try {
    // 1. 获取用户 ID
    console.log('[MediumAPI] Step 1: Getting user ID for', username);
    const userId = await getMediumUserId(username);
    if (!userId) {
      throw new MediumApiError('User not found');
    }
    console.log('[MediumAPI] User ID:', userId);

    // 2. 获取文章 ID 列表
    console.log('[MediumAPI] Step 2: Getting article IDs, limit:', limit);
    const articleIds = await getMediumUserArticleIds(userId, limit);
    console.log('[MediumAPI] Got article IDs count:', articleIds.length);
    console.log('[MediumAPI] Article IDs:', articleIds);

    if (articleIds.length === 0) {
      return [];
    }

    // 3. 批量获取文章详情
    console.log('[MediumAPI] Step 3: Fetching article details...');
    const articles = await getMediumArticlesBatch(articleIds);
    console.log('[MediumAPI] Final articles count:', articles.length);

    return articles;
  } catch (error) {
    console.warn('[MediumAPI] Error (will fallback):', error);
    if (error instanceof MediumApiError) {
      throw error;
    }
    throw new MediumApiError(
      `Failed to fetch user articles: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
