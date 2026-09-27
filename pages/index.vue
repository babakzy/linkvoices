<template>
  <Header />
  <main>
    <LandingHero />
    <LandingHero1 />
    <LandingLinks />
    <LandingQuote />
    <LandingAdvantages />
    <LandingFaq />
    <LandingSeoContent />
  </main>
  <Footer />
</template>

<script setup lang="js">
import { buildHomeFaqSchema } from '~/data/homeFaq.js'

definePageMeta({
  layout: false
})

const config = useRuntimeConfig()
const siteUrl = (config.public.url || 'https://linkvoices.com').replace(/\/$/, '')
const pageUrl = siteUrl
const pageImageUrl = `${siteUrl}/og-image.jpg`

const pageTitle = 'Linkvoices — Free Cryptocurrency Invoice Generator'
const pageDescription =
  'Create and send free cryptocurrency invoices directly to your wallet. Accept Bitcoin, Ethereum, USDT, and DAI with no platform fees — invoices in minutes, paid worldwide.'

usePageSeo({
  title: pageTitle,
  description: pageDescription,
  path: '/',
  appendSiteName: false,
})

const faqSchema = buildHomeFaqSchema()

useHead({
  meta: [
    {
      name: 'keywords',
      content:
        'cryptocurrency invoicing, crypto invoice, bitcoin invoice, ethereum invoice, USDT invoice, DAI invoice, free crypto invoice generator, blockchain payments, crypto billing, freelance crypto payments',
    },
    { property: 'og:locale', content: 'en_US' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
        image: pageImageUrl,
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Linkvoices',
          url: siteUrl,
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Linkvoices',
        url: siteUrl,
        description: pageDescription,
        publisher: {
          '@type': 'Organization',
          name: 'Linkvoices',
          url: siteUrl,
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Linkvoices',
        url: siteUrl,
        description:
          'Free cryptocurrency invoice generator. Send direct crypto invoices in Bitcoin, Ethereum, USDT, and DAI with no platform fees.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Bitcoin, Ethereum, USDT, and DAI invoicing',
          'Zero platform fees',
          'Direct wallet payouts',
          'International payments',
          'Payment notifications',
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Linkvoices',
        url: siteUrl,
        logo: pageImageUrl,
        description: pageDescription,
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema),
    },
  ],
})
</script>

<style scoped></style>
