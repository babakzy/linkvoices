<template>
  <NetworkAppShell>
    <form class="border-b border-neutral-200 px-4 py-4" @submit.prevent="search">
      <h1 class="text-xl font-semibold">Search</h1>
      <div class="mt-3 flex gap-2">
        <input v-model="term" class="w-full rounded-ui border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-blue" placeholder="People or posts" aria-label="Search">
        <UiButton type="submit" :loading="pending">Search</UiButton>
      </div>
    </form>
    <p v-if="error" class="px-4 py-6 text-sm text-red-700">{{ error }}</p>
    <article v-for="item in results" :key="item.id" class="border-b border-neutral-200 px-4 py-4">
      <nuxt-link v-if="item.href" :to="item.href" class="font-semibold hover:underline">{{ item.title }}</nuxt-link>
      <p v-else class="font-semibold">{{ item.title }}</p>
      <p class="mt-1 text-sm text-neutral-600">{{ item.detail }}</p>
    </article>
  </NetworkAppShell>
</template>

<script setup lang="ts">
import { personLabel, shortNpub } from '~/utils/network/format'

definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Search', path: '/search', noindex: true })

const term = ref('')
const pending = ref(false)
const error = ref('')
const results = ref<Array<{ id: string, title: string, detail: string, href?: string }>>([])
const { query, profiles } = useNostr()

async function search() {
  const q = term.value.trim()
  if (!q) return
  pending.value = true
  error.value = ''
  results.value = []
  try {
    const nip19 = await import('nostr-tools/nip19')
    const notes = await query({ kinds: [1], search: q, limit: 30 }).catch(() => [])
    const fallback = notes.length ? notes : (await query({ kinds: [1], limit: 40 })).filter(note => note.content.toLowerCase().includes(q.toLowerCase()))
    const cache = await profiles(fallback.map(note => note.pubkey))
    results.value = fallback.slice(0, 25).map((note) => {
      const npub = nip19.npubEncode(note.pubkey)
      return {
        id: note.id,
        title: personLabel(cache.get(note.pubkey)?.content, shortNpub(npub)),
        detail: note.content.slice(0, 180),
        href: `/u/${npub}`,
      }
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Search failed.'
  } finally {
    pending.value = false
  }
}
</script>
