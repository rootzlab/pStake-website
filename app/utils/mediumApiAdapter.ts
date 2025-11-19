/**
 * MediumAPI 数据适配器
 * 将 MediumAPI 响应转换为现有的 MediumArticle 接口
 */

import { MediumApiArticle } from './mediumApi';
import { MediumArticle } from './medium';

/**
 * 将 MediumAPI 文章转换为 MediumArticle 格式
 * @param apiArticle MediumAPI 返回的文章数据
 * @returns 转换后的 MediumArticle
 */
export function convertMediumApiArticle(apiArticle: MediumApiArticle): MediumArticle {
  // 转换发布日期格式
  // MediumAPI: "YYYY-MM-DD hh:mm:ss"
  // MediumArticle: RFC 2822 格式（如 RSS 中的 pubDate）
  const pubDate = apiArticle.published_at
    ? new Date(apiArticle.published_at).toUTCString()
    : null;

  // 提取作者名称（MediumAPI 返回的是 author ID，需要单独获取）
  // 暂时使用空值，后续可以通过 /user/{user_id} 端点获取完整信息
  const author = null;

  // 转换分类标签
  const categories = apiArticle.tags || [];

  // 封面图片（MediumAPI 直接提供 URL）
  const coverImage = apiArticle.image_url || null;

  // 摘要（使用 subtitle）
  const summary = apiArticle.subtitle || null;

  // 文章 URL
  const link = apiArticle.url;

  // GUID（使用文章 ID）
  const guid = apiArticle.id;

  return {
    title: apiArticle.title,
    link,
    guid,
    pubDate,
    author,
    categories,
    coverImage,
    summary,
    content: null, // MediumAPI 需要单独调用 /article/{id}/content 获取内容
  };
}

/**
 * 批量转换 MediumAPI 文章
 * @param apiArticles MediumAPI 返回的文章数组
 * @returns 转换后的 MediumArticle 数组
 */
export function convertMediumApiArticles(apiArticles: MediumApiArticle[]): MediumArticle[] {
  return apiArticles.map(convertMediumApiArticle);
}
