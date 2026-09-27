<template>
  <div class="min-h-screen bg-white">
    <Header />
    <main class="mx-auto max-w-[600px] border-x border-neutral-200 bg-white px-4 py-8">
      <div v-if="pending" class="flex justify-center py-16"><UiSpinner /></div>
      <template v-else-if="profile">
        <UiBadge :variant="profile.isMember ? 'neutral' : 'blue'">{{ profile.isMember ? 'Member' : 'Nostr profile' }}</UiBadge>
        <h1 class="mt-3 text-3xl font-semibold">{{ profile.displayName || 'Nostr profile' }}</h1>
        <p v-if="about" class="mt-3 max-w-prose text-base leading-relaxed">{{ about }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <UiBadge v-for="tag in profile.tags" :key="tag.label">{{ tag.label }}</UiBadge>
        </div>
        <div v-if="account && account.pubkey !== pubkey" class="mt-6 flex flex-wrap items-end gap-3">
          <UiButton @click="follow">Follow</UiButton>
          <div class="min-w-48">
            <label class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500" for="connection">Connection type</label>
            <select id="connection" v-model="connection" class="mt-1 w-full rounded-ui border border-neutral-300 bg-white px-3 py-2 text-sm">
              <option value="interested_in">Interested in</option>
              <option value="inspired_by">Inspired by</option>
              <option value="online_friend">Online friend</option>
              <option value="real_friend">Real-life friend</option>
              <option value="works_with">Works with</option>
              <option value="family">Family</option>
              <option value="custom">Other</option>
            </select>
          </div>
          <UiButton variant="secondary" @click="connect">Add</UiButton>
        </div>
        <p v-if="message" class="mt-3 text-sm">{{ message }}</p>
        <form v-if="account && account.pubkey !== pubkey" class="mt-8 border-t border-neutral-200 pt-6" @submit.prevent>
          <p class="text-sm">Did this connection turn out to be useful? This stays private.</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <UiButton v-for="item in outcomes" :key="item.id" type="button" size="sm" variant="secondary" @click="sendFeedback(item.id)">{{ item.label }}</UiButton>
          </div>
        </form>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const account = useNetworkAccount()
const { query, signAndPublish } = useNostr()
const pending = ref(true)
const message = ref('')
const connection = ref('interested_in')
const pubkey = ref('')
const profile = ref<{ displayName: string | null, isMember: boolean, nostr: { about?: string } | null, tags: Array<{ label: string }> } | null>(null)
const about = computed(() => profile.value?.nostr?.about || '')
const outcomes = [
  { id: 'conversation', label: 'Good conversation' },
  { id: 'met', label: 'Met in person' },
  { id: 'collaborating', label: 'Working together' },
  { id: 'friends', label: 'Became friends' },
  { id: 'not_relevant', label: 'Not relevant' },
  { id: 'no_response', label: 'No response' },
]

usePageSeo({ title: 'Profile', path: route.path })

async function follow() {
  if (!account.value) {
    await navigateTo(`/start?next=${encodeURIComponent(route.fullPath)}`)
    return
  }
  const lists = await query({ kinds: [3], authors: [account.value.pubkey], limit: 2 })
  const current = lists.sort((a, b) => b.created_at - a.created_at)[0]
  const tags = (current?.tags || []).filter(tag => tag[0] === 'p' && tag[1])
  if (!tags.some(tag => tag[1] === pubkey.value)) tags.push(['p', pubkey.value])
  await signAndPublish({ kind: 3, content: '', tags })
  message.value = 'Following.'
}

async function connect() {
  if (!account.value) return navigateTo('/start')
  const response = await $fetch<{ connection: { status: string } }>('/api/network/connections', {
    method: 'POST',
    body: { toPubkey: pubkey.value, kindSlug: connection.value },
  })
  message.value = response.connection.status === 'pending'
    ? 'Follow still happens immediately. This connection type waits for them to accept.'
    : 'Saved. Following does not wait for approval.'
}

async function sendFeedback(outcome: string) {
  await $fetch('/api/network/feedback', { method: 'POST', body: { aboutPubkey: pubkey.value, outcome } })
  message.value = 'Thanks. That stays private.'
}

onMounted(async () => {
  const nip19 = await import('nostr-tools/nip19')
  const decoded = nip19.decode(String(route.params.npub))
  if (decoded.type !== 'npub') {
    pending.value = false
    return
  }
  pubkey.value = decoded.data
  try {
    const loadProfile = $fetch as (path: string) => Promise<NonNullable<typeof profile.value>>
    profile.value = await loadProfile(`/api/network/profile?pubkey=${pubkey.value}`)
  } catch {
    const events = await query({ kinds: [0], authors: [pubkey.value], limit: 1 })
    const latest = events.sort((a, b) => b.created_at - a.created_at)[0]
    let about = ''
    let displayName = 'Nostr profile'
    if (latest) {
      try {
        const meta = JSON.parse(latest.content) as { about?: string, display_name?: string, name?: string }
        about = meta.about || ''
        displayName = meta.display_name || meta.name || displayName
      } catch { /* ignore malformed profile text */ }
    }
    profile.value = { displayName, isMember: false, nostr: { about }, tags: [] }
  }
  pending.value = false
})
</script>
