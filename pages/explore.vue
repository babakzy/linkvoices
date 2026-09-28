<template>
  <div class="min-h-screen bg-white">
    <Header />
    <div class="mx-auto grid min-h-[70vh] w-full max-w-[60rem] grid-cols-1 md:grid-cols-[17rem_minmax(0,1fr)] md:border-x md:border-neutral-200">
      <NetworkIdentityColumn class="border-b border-neutral-200 md:sticky md:top-0 md:self-start md:border-b-0 md:border-r" />
      <main class="min-w-0 bg-white">
        <div class="border-b border-neutral-200 px-4 py-4">
          <h1 class="text-xl font-semibold">Look around</h1>
          <p class="mt-1 text-sm text-neutral-600">Public posts in English. You can read before you create an account.</p>
        </div>
        <NetworkFeed guest />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
usePageSeo({
  title: 'Look around',
  description: 'Read public posts on Linkvoices before you create an account.',
  path: '/explore',
  appendSiteName: false,
})
</script>
