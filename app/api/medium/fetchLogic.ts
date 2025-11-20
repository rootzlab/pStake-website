/**
 * Medium 数据获取共享逻辑
 * 可被 API 路由和服务端组件使用
 */

import { fetchMediumFeed, MediumFeedResponse } from "@/app/utils/medium";
import { getMediumUserArticles, MediumApiError } from "@/app/utils/mediumApi";
import { convertMediumApiArticles } from "@/app/utils/mediumApiAdapter";

// 是否启用 MediumAPI（通过环境变量控制）。
// 显式关闭：设置 ENABLE_MEDIUMAPI=false/0/off。
const ENABLE_MEDIUMAPI = () => {
    const flag = (process.env.ENABLE_MEDIUMAPI || '').trim().toLowerCase();
    if (flag === 'false' || flag === '0' || flag === 'off') return false;
    return Boolean(process.env.RAPIDAPI_KEY);
};

/**
 * 使用 MediumAPI 获取文章
 */
async function fetchWithMediumApi(source: string, limit: number): Promise<MediumFeedResponse> {
    // 缓存已禁用，每次都重新获取
    console.log(`[MediumAPI] Fetching articles for ${source} (limit: ${limit})`);

    // 获取文章数据
    const apiArticles = await getMediumUserArticles(source, limit);

    // 转换为统一格式
    const articles = convertMediumApiArticles(apiArticles);

    const response: MediumFeedResponse = {
        feed: {
            title: `${source} on Medium`,
            link: `https://medium.com/@${source}`,
            description: null,
            lastBuildDate: new Date().toUTCString(),
        },
        articles,
    };

    console.log(`[MediumAPI] Successfully fetched ${articles.length} articles`);
    return response;
}

/**
 * 智能降级：优先使用 MediumAPI，失败时降级到 RSS Feed
 */
export async function fetchMediumWithFallback(
    source: string,
    limit: number
): Promise<MediumFeedResponse & { dataSource: string }> {
    // 如果 MediumAPI 未启用，直接使用 RSS Feed
    if (!ENABLE_MEDIUMAPI()) {
        console.log(`[Medium] MediumAPI not enabled, using RSS Feed`);
        const payload = await fetchMediumFeed(source, limit);
        return { ...payload, dataSource: 'rss' };
    }

    try {
        // 优先尝试 MediumAPI
        const payload = await fetchWithMediumApi(source, limit);
        return { ...payload, dataSource: 'mediumapi' };
    } catch (error) {
        // 判断是否为配额超限错误
        const isQuotaExceeded = error instanceof MediumApiError && error.isQuotaExceeded;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (isQuotaExceeded) {
            console.warn(`[MediumAPI] Quota exceeded, falling back to RSS Feed`);
        } else {
            console.warn(`[MediumAPI] Failed (${errorMessage}), falling back to RSS Feed`);
        }

        // 降级到 RSS Feed
        try {
            const payload = await fetchMediumFeed(source, limit);
            return { ...payload, dataSource: 'rss-fallback' };
        } catch (rssError) {
            console.error(`[RSS] RSS Feed also failed:`, rssError);

            // 如果 RSS 也失败，抛出原始错误
            throw new Error(
                `Both MediumAPI and RSS Feed failed. MediumAPI: ${errorMessage}; RSS: ${rssError instanceof Error ? rssError.message : 'Unknown error'}`
            );
        }
    }
}
