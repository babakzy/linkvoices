<template>
  <Header />
  <main>
    <LandingNetworkHero />
    <LandingNetworkDecentralized />
    <LandingLinks />
    <LandingNetworkPromise />
  </main>
  <Footer />
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

usePageSeo({
  title: 'Linkvoices — Find the right people',
  description: 'A simple social app for an open network. Create your account, keep it, and find people worth knowing.',
  path: '/',
  appendSiteName: false,
})
</script>
