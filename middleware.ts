import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { locales, defaultLocale, type Locale } from './i18n';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const SUPPORTED_LOCALES = new Set<Locale>(locales);

const ACCEPT_LANGUAGE_MAPPINGS: Record<string, Locale> = {
  zh: 'cn',
  'zh-cn': 'cn',
  'zh-hans': 'cn',
  ko: 'kr',
  'ko-kr': 'kr'
};

function normalizeToLocale(value?: string | null): Locale | null {
  if (!value) {
    return null;
  }

  const lowerCaseValue = value.toLowerCase();
  if (SUPPORTED_LOCALES.has(lowerCaseValue as Locale)) {
    return lowerCaseValue as Locale;
  }

  const exactMapping = ACCEPT_LANGUAGE_MAPPINGS[lowerCaseValue];
  if (exactMapping) {
    return exactMapping;
  }

  const baseTag = lowerCaseValue.split('-')[0];
  if (SUPPORTED_LOCALES.has(baseTag as Locale)) {
    return baseTag as Locale;
  }

  const baseMapping = ACCEPT_LANGUAGE_MAPPINGS[baseTag];
  if (baseMapping) {
    return baseMapping;
  }

  return null;
}

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = normalizeToLocale(request.cookies.get(LOCALE_COOKIE)?.value);
  if (cookieLocale) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage
      .split(',')
      .map((entry) => entry.split(';')[0]?.trim())
      .filter(Boolean);
    for (const candidate of preferredLocales) {
      const normalized = normalizeToLocale(candidate);
      if (normalized) {
        return normalized;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const locale = detectLocale(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-NEXT-INTL-LOCALE', locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  if (request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
    response.cookies.set({
      name: LOCALE_COOKIE,
      value: locale,
      path: '/',
      sameSite: 'lax',
      maxAge: ONE_YEAR_SECONDS
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
