import type { Metadata } from 'next';
import type { Locale } from '@/i18n';

/**
 * 基础网站信息配置
 */
export const SITE_CONFIG = {
  name: 'PSTAKE',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pstake-code.vercel.app',
  description: 'PSTAKE — Research Layer for Web3 & AI',
  defaultImage: '/img/OpenGraph.png',
  twitterHandle: '@pstake',
} as const;

/**
 * 语言到 OpenGraph locale 的映射
 */
const LOCALE_MAP: Record<Locale, string> = {
  en: 'en_US',
  cn: 'zh_CN',
  kr: 'ko_KR',
};

/**
 * 生成完整的 URL
 */
export function getAbsoluteUrl(path: string, locale?: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const localePrefix = locale && locale !== 'en' ? `/${locale}` : '';
  return `${SITE_CONFIG.url}${localePrefix}${cleanPath}`;
}

/**
 * 生成 OpenGraph 元数据配置
 */
export interface OpenGraphConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  locale?: Locale;
  type?: 'website' | 'article';
  siteName?: string;
}

export function generateOpenGraph(config: OpenGraphConfig): Metadata['openGraph'] {
  const {
    title,
    description,
    url,
    image = SITE_CONFIG.defaultImage,
    locale = 'en' as Locale,
    type = 'website',
    siteName = SITE_CONFIG.name,
  } = config;

  const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;
  const pageUrl = url || SITE_CONFIG.url;

  return {
    title,
    description,
    url: pageUrl,
    siteName,
    locale: LOCALE_MAP[locale],
    type,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    // 添加其他语言版本
    alternateLocale: Object.keys(LOCALE_MAP)
      .filter((l) => l !== locale)
      .map((l) => LOCALE_MAP[l as Locale]),
  };
}

/**
 * 生成 Twitter Card 元数据配置
 */
export interface TwitterCardConfig {
  title: string;
  description: string;
  image?: string;
  card?: 'summary' | 'summary_large_image';
}

export function generateTwitterCard(config: TwitterCardConfig): Metadata['twitter'] {
  const {
    title,
    description,
    image = SITE_CONFIG.defaultImage,
    card = 'summary_large_image',
  } = config;

  const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

  return {
    card,
    title,
    description,
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    images: [imageUrl],
  };
}

/**
 * 生成页面完整的元数据
 */
export interface PageMetadataConfig {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  image?: string;
  type?: 'website' | 'article';
}

export function generatePageMetadata(config: PageMetadataConfig): Metadata {
  const {
    title,
    description,
    path,
    locale = 'en' as Locale,
    image,
    type = 'website',
  } = config;

  const fullTitle = title === SITE_CONFIG.name ? title : `${SITE_CONFIG.name} | ${title}`;
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    openGraph: generateOpenGraph({
      title: fullTitle,
      description,
      url,
      image,
      locale,
      type,
    }),
    twitter: generateTwitterCard({
      title: fullTitle,
      description,
      image,
    }),
    alternates: {
      canonical: url,
      languages: {
        'en': getAbsoluteUrl(path, 'en'),
        'zh': getAbsoluteUrl(path, 'cn'),
        'ko': getAbsoluteUrl(path, 'kr'),
      },
    },
  };
}
