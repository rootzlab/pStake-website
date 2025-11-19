import type { Locale } from '@/i18n';

const DATE_LOCALE_MAP: Record<Locale, string> = {
  en: 'en-US',
  cn: 'zh-CN',
  kr: 'ko-KR'
};

const DATE_FORMATTERS: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat(DATE_LOCALE_MAP.en, { month: 'short', day: 'numeric' }),
  cn: new Intl.DateTimeFormat(DATE_LOCALE_MAP.cn, { month: 'short', day: 'numeric' }),
  kr: new Intl.DateTimeFormat(DATE_LOCALE_MAP.kr, { month: 'short', day: 'numeric' })
};

const RELATIVE_LABELS: Record<Locale, { today: string; daysAgo: (days: number) => string }> = {
  en: {
    today: 'Today',
    daysAgo: (days: number) => `${days}d ago`
  },
  cn: {
    today: '今天',
    daysAgo: (days: number) => `${days}天前`
  },
  kr: {
    today: '오늘',
    daysAgo: (days: number) => `${days}일 전`
  }
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function formatAbsoluteDate(date: Date, locale: Locale) {
  const formatter = DATE_FORMATTERS[locale] ?? DATE_FORMATTERS.en;
  return formatter.format(date);
}

export function formatArticleDate(pubDate: string | null | undefined, locale: Locale): string {
  if (!pubDate) return '';

  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - parsed.getTime();
  const relative = RELATIVE_LABELS[locale] ?? RELATIVE_LABELS.en;

  if (diffMs >= 0) {
    const diffDays = Math.floor(diffMs / DAY_IN_MS);
    if (diffDays === 0) return relative.today;
    if (diffDays < 7) return relative.daysAgo(diffDays);
  }

  return formatAbsoluteDate(parsed, locale);
}
