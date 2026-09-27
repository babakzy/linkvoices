<template>
  <div class="min-h-screen bg-white">
    <Header />
    <main class="mx-auto min-h-[70vh] max-w-[600px] border-x border-neutral-200 bg-white">
      <div class="border-b border-neutral-200 px-4 py-4">
        <h1 class="text-xl font-semibold">Look around</h1>
        <p class="mt-1 text-sm text-neutral-600">Public posts from the open network. You can read before you create an account.</p>
      </div>
      <NetworkFeed guest />
    </main>
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
