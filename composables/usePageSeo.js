/**
 * Shared SEO defaults for public pages (title, description, OG, Twitter, canonical).
 */
export function usePageSeo({
  title,
  description,
  path,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noindex = false,
} = {}) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = (config.public.url || 'https://linkvoices.com').replace(/\/$/, '')
  const pagePath = path ?? route.path
  const canonicalUrl = pagePath.startsWith('http')
    ? pagePath
    : `${siteUrl}${pagePath.startsWith('/') ? pagePath : `/${pagePath}`}`
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`
  const pageTitle = title?.includes('Linkvoices') ? title : `${title} | Linkvoices`

  useSeoMeta({
    title: pageTitle,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    ogType,
    ogSiteName: 'Linkvoices',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
  })

  useHead({
    htmlAttrs: { lang: 'en' },
    link: [{ rel: 'canonical', href: canonicalUrl }],
  })
}
