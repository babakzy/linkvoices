<template>
  <NetworkAppShell>
    <div class="border-b border-neutral-200 px-4 py-4">
      <h1 class="text-xl font-semibold">Discover</h1>
      <p v-if="intent" class="mt-1 text-sm text-neutral-600">Active intent: {{ intent }}</p>
      <label class="mt-3 block font-mono text-xs uppercase tracking-[0.06em] text-neutral-500" for="preset">How to look</label>
      <select id="preset" v-model="preset" class="mt-1 w-full rounded-ui border border-neutral-300 bg-white px-3 py-2 text-sm" @change="load">
        <option v-for="item in DISCOVERY_PRESETS" :key="item.id" :value="item.id">{{ item.label }}</option>
      </select>
    </div>
    <div v-if="pending" class="flex justify-center py-16"><UiSpinner /></div>
    <p v-else-if="error" class="px-4 py-10 text-sm">{{ error }}</p>
    <article v-for="person in people" :key="person.pubkey" class="border-b border-neutral-200 bg-white px-4 py-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <nuxt-link :to="person.href" class="font-semibold hover:underline">{{ person.name }}</nuxt-link>
          <UiBadge class="ml-2" :variant="person.isMember ? 'neutral' : 'blue'">{{ person.isMember ? 'Member' : 'Nostr profile' }}</UiBadge>
          <p v-if="person.about" class="mt-1 line-clamp-2 text-sm text-neutral-600">{{ person.about }}</p>
        </div>
        <UiButton size="sm" variant="secondary" @click="follow(person.pubkey)">Follow</UiButton>
      </div>
      <div class="mt-3 border border-neutral-200 bg-white p-3">
        <p class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">Why this person?</p>
        <ul class="mt-2 space-y-1 text-sm">
          <li v-for="reason in person.reasons" :key="reason">{{ reason }}</li>
        </ul>
      </div>
    </article>
    <p v-if="!pending && !people.length" class="px-4 py-16 text-center text-sm text-neutral-600">No matches yet. Add interests on your profile, or the open network has not answered.</p>
  </NetworkAppShell>
</template>

<script setup lang="ts">
import { DISCOVERY_PRESETS } from '~/utils/network/constants'

definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Discover', path: '/discover', noindex: true })

const { query, profiles, signAndPublish } = useNostr()
const account = useNetworkAccount()
const preset = ref('similar_interests')
const pending = ref(true)
const error = ref('')
const intent = ref('')
const people = ref<Array<{ pubkey: string, name: string, about: string, href: string, isMember: boolean, reasons: string[] }>>([])

async function follow(pubkey: string) {
  if (!account.value) return
  const lists = await query({ kinds: [3], authors: [account.value.pubkey], limit: 2 })
  const current = lists.sort((a, b) => b.created_at - a.created_at)[0]
  const tags = (current?.tags || []).filter(tag => tag[0] === 'p' && tag[1])
  if (!tags.some(tag => tag[1] === pubkey)) tags.push(['p', pubkey])
  await signAndPublish({ kind: 3, content: '', tags })
}

async function load() {
  pending.value = true
  error.value = ''
  try {
    const response = await $fetch<{ intent: string | null, people: Array<{ pubkey: string, name: string, about: string, isMember: boolean, reasons: string[] }> }>(`/api/network/discover?preset=${preset.value}`)
    intent.value = response.intent || ''
    const nip19 = await import('nostr-tools/nip19')
    const mapped = response.people.map(person => ({
      ...person,
      href: `/u/${nip19.npubEncode(person.pubkey)}`,
    }))
    if (mapped.length < 5) {
      const notes = await query({ kinds: [1], limit: 30 })
      const authors = [...new Set(notes.map(note => note.pubkey))].slice(0, 8)
      const cache = await profiles(authors)
      for (const pubkey of authors) {
        if (mapped.some(person => person.pubkey === pubkey) || pubkey === account.value?.pubkey) continue
        const profile = cache.get(pubkey)
        let name = 'Nostr profile'
        let about = ''
        if (profile) {
          try {
            const meta = JSON.parse(profile.content) as { display_name?: string, name?: string, about?: string }
            name = meta.display_name || meta.name || name
            about = meta.about || ''
          } catch { /* ignore */ }
        }
        mapped.push({
          pubkey,
          name,
          about,
          isMember: false,
          href: `/u/${nip19.npubEncode(pubkey)}`,
          reasons: ['They posted recently on the open network, outside your follows.'],
        })
      }
    }
    people.value = mapped
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Discovery is unavailable until the database migration has been applied.'
  } finally {
    pending.value = false
  }
}

onMounted(load)
</script>
