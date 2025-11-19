import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { ErrorBoundary } from "./_components/ErrorBoundary";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { defaultLocale, locales, type Locale } from '../i18n';
import { SITE_CONFIG, generateOpenGraph, generateTwitterCard } from './utils/seo';

// 配置PP Mori字体
const ppmoriRegular = localFont({
  src: "../public/fonts/pp-mori/PPMori-Regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-pp-mori-regular",
});

const ppmoriExtralight = localFont({
  src: "../public/fonts/pp-mori/PPMori-Extralight.otf",
  weight: "200",
  style: "normal",
  variable: "--font-pp-mori-extralight",
});

const ppmoriSemibold = localFont({
  src: "../public/fonts/pp-mori/PPMori-SemiBold.otf",
  weight: "600",
  style: "normal",
  variable: "--font-pp-mori-semibold",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `${SITE_CONFIG.name} | %s`,
  },
  description: SITE_CONFIG.description,
  keywords: ['Web3', 'AI', 'Research', 'Blockchain', 'DeFi', 'Decentralized', 'Innovation', 'PSTAKE'],
  authors: [{ name: 'PSTAKE' }],
  creator: 'PSTAKE',
  publisher: 'PSTAKE',
  icons: {
    icon: [
      { url: "/img/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: [
      { url: "/img/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/img/favicon.png", type: "image/png" },
    ],
  },
  openGraph: generateOpenGraph({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: SITE_CONFIG.defaultImage,
  }),
  twitter: generateTwitterCard({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    image: SITE_CONFIG.defaultImage,
  }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestedLocale = await getLocale().catch(() => defaultLocale);
  const locale = (locales.includes(requestedLocale as Locale) ? requestedLocale : defaultLocale) as Locale;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={`${ppmoriRegular.variable} ${ppmoriExtralight.variable} ${ppmoriSemibold.variable} antialiased font-pp-mori`}
      >
        <Script src="/rem.js" strategy="afterInteractive" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
