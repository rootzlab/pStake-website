// 支持的语言列表（客户端与中间件安全）
export const locales = ['en', 'cn', 'kr'] as const;
export type Locale = (typeof locales)[number];

// 默认语言
export const defaultLocale: Locale = 'en';

