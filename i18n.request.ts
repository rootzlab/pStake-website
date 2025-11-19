import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { locales, defaultLocale, type Locale } from './i18n';

export default getRequestConfig(async ({ locale }) => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  let resolvedLocale = locale || localeCookie || defaultLocale;

  if (!locales.includes(resolvedLocale as Locale)) {
    resolvedLocale = defaultLocale;
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});