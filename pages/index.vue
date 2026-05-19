<template>
  <Header></Header>

    <home-landing />
  
</template>

<script setup lang="js">
definePageMeta({
  layout: false
})

const config = useRuntimeConfig()
const siteUrl = config.public.url || 'https://linkvoices.com'

useHead({
  title: 'Send Direct Cryptocurrency Invoices for Free',
  link: [
    { rel: 'canonical', href: siteUrl }
  ],
  meta: [
    {
      name: 'description',
      content: 'Create and send direct cryptocurrency invoices for free. Accept Bitcoin, Ethereum, USDT, and DAI payments with no platform fees — straight to your wallet.'
    },
    {
      name: 'keywords',
      content: 'cryptocurrency invoicing, crypto invoice, bitcoin invoice, ethereum invoice, USDT invoice, DAI invoice, free crypto invoice generator, blockchain payments, crypto billing'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    {
      property: 'og:title',
      content: 'Linkvoices — Free Cryptocurrency Invoice Generator'
    },
    {
      property: 'og:description',
      content: 'Create and send direct cryptocurrency invoices for free. Accept Bitcoin, Ethereum, USDT, and DAI — no platform fees, no middlemen.'
    },
    { property: 'og:site_name', content: 'Linkvoices' },
    { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Linkvoices — Free Cryptocurrency Invoice Generator'
    },
    {
      name: 'twitter:description',
      content: 'Create and send direct cryptocurrency invoices for free. Bitcoin, Ethereum, USDT, and DAI — no platform fees.'
    },
    { name: 'twitter:image', content: `${siteUrl}/og-image.jpg` },
    { name: 'robots', content: 'index, follow' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Linkvoices',
        url: siteUrl,
        description: 'Free cryptocurrency invoice generator. Send direct crypto invoices in Bitcoin, Ethereum, USDT, and DAI.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      })
    }
  ]
})
</script>

<style scoped></style>