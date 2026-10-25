import { defaultLocale, locales, type Locale } from '@/i18n/dictionaries'

// Set this at build time to the origin served by the local Nginx host.
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://devtoys.ex-foundry.com',
).origin
export const siteName = 'DevToys'

export const ogLocales: Record<Locale, string> = {
  ja: 'ja_JP',
  en: 'en_US',
  'zh-CN': 'zh_CN',
}

// Keep the social preview image as a regular static asset for local hosts.
export const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: `${siteName} — a focused toolkit for everyday development`,
}

/** Absolute URL for a site-relative path, normalised to `trailingSlash: true`. */
export const absoluteUrl = (path: string) => {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`
  return `${siteUrl}${normalized}`
}

/**
 * Canonical plus `hreflang` alternates for one page. `path` is the locale-less
 * remainder, e.g. `''` for a locale home or `converters/json-csv-converter`.
 */
export const alternatesFor = (locale: Locale, path = '') => {
  const suffix = path ? `/${path}` : ''
  const languages = Object.fromEntries(
    locales.map((other) => [other, absoluteUrl(`${other}${suffix}`)]),
  ) as Record<Locale, string>

  return {
    canonical: absoluteUrl(`${locale}${suffix}`),
    languages: { ...languages, 'x-default': absoluteUrl(`${defaultLocale}${suffix}`) },
  }
}
