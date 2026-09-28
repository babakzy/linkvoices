<template>
  <NetworkAppShell>
    <NetworkIdentityColumn variant="sidebar" class="border-b border-neutral-200 md:hidden" />
    <NetworkFeed />
    <template #rail>
      <div class="border border-neutral-200 bg-white p-4">
        <p class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">Right now</p>
        <p class="mt-2 text-sm leading-relaxed">The feed is people you follow, plus the modes you pick. It is not a score you have to beat.</p>
        <UiButton class="mt-4" variant="secondary" to="/discover">Find people</UiButton>
      </div>
    </template>
  </NetworkAppShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Home', path: '/home', noindex: true })
</script>
