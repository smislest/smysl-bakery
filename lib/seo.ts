import type { Metadata } from 'next';
import { getSiteSettings, type SiteSettings } from './siteSettingsData';
import { cache } from 'react';

const FALLBACK_SITE_URL = 'https://smysl-bakery-8e13.vercel.app';
const DEFAULT_TITLE = 'Безглютеновая пекарня в Москве — свежая выпечка и десерты';
const DEFAULT_DESCRIPTION = 'Свежая безглютеновая выпечка в Москве: хлеб, пироги, десерты. Натуральные ингредиенты, собственное производство. Доставка и самовывоз.';
const SITE_NAME = 'СМЫСЛ есть';

// Кэшированные настройки сайта с React.cache для дедупликации в рамках одного рендера
export const getSeoSettings = cache(async (): Promise<SiteSettings> => {
  return await getSiteSettings();
});

function normalizeSiteUrl(raw?: string): string {
  if (!raw) return FALLBACK_SITE_URL;
  try {
    const url = new URL(raw);
    return url.origin + (url.pathname === '/' ? '' : url.pathname.replace(/\/$/, ''));
  } catch {
    try {
      const withProtocol = new URL(`https://${raw}`);
      return withProtocol.origin + (withProtocol.pathname === '/' ? '' : withProtocol.pathname.replace(/\/$/, ''));
    } catch {
      return FALLBACK_SITE_URL;
    }
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const noindex = process.env.NEXT_PUBLIC_NOINDEX === '1';
export const defaultTitle = DEFAULT_TITLE;
export const defaultDescription = DEFAULT_DESCRIPTION;
export const siteName = SITE_NAME;
export const defaultOgImage = `${siteUrl}/img/logo.png`;

export function canonical(path: string): string {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function absoluteUrl(path: string): string {
  const normalizedPath = canonical(path);
  return `${siteUrl}${normalizedPath}`;
}

export function buildRobots(): Metadata['robots'] {
  if (noindex) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        nosnippet: true,
      },
    };
  }

  return {
    index: true,
    follow: true,
  };
}

export function buildOpenGraph(
  overrides: Partial<NonNullable<Metadata['openGraph']>> = {},
): NonNullable<Metadata['openGraph']> {
  const baseImages = overrides.images ?? [
    {
      url: defaultOgImage,
      width: 1200,
      height: 630,
      alt: SITE_NAME,
    },
  ];

  return {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: SITE_NAME,
    images: baseImages,
    ...overrides,
  };
}

export function buildTwitter(
  overrides: Partial<NonNullable<Metadata['twitter']>> = {},
): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title: overrides.title ?? DEFAULT_TITLE,
    description: overrides.description ?? DEFAULT_DESCRIPTION,
    images: overrides.images ?? [defaultOgImage],
    ...overrides,
  };
}