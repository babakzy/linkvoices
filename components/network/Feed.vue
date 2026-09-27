<template>
  <section class="bg-white pb-20 md:pb-0">
    <div class="sticky top-0 z-10 border-b border-neutral-200 bg-white">
      <div class="flex gap-1 overflow-x-auto px-2">
        <button
          v-for="mode in FEED_MODES"
          :key="mode.id"
          type="button"
          class="shrink-0 border-b-2 px-3 py-3 text-sm"
          :class="active === mode.id ? 'border-ink font-semibold text-ink' : 'border-transparent text-neutral-500'"
          @click="select(mode.id)"
        >
          {{ mode.label }}
        </button>
      </div>
    </div>

    <form v-if="account" class="border-b border-neutral-200 px-4 py-3" @submit.prevent="publishPost">
      <textarea v-model="draft" rows="3" class="w-full resize-none text-[15px] outline-none placeholder:text-neutral-400" placeholder="What is happening?" />
      <div class="flex items-center justify-between">
        <nuxt-link to="/write" class="text-sm text-brand-blue">Write an article</nuxt-link>
        <UiButton type="submit" :disabled="!draft.trim()" :loading="posting">Post</UiButton>
      </div>
      <p v-if="postError" class="mt-2 text-sm text-red-700">{{ postError }}</p>
    </form>

    <div v-if="status === 'loading'" class="flex justify-center py-16">
      <UiSpinner />
    </div>
    <div v-else-if="status === 'error'" class="px-4 py-16 text-center">
      <p class="text-sm">The network did not answer.</p>
      <UiButton class="mt-4" variant="secondary" @click="load">Try again</UiButton>
    </div>
    <div v-else-if="!visible.length" class="px-4 py-16 text-center">
      <p class="text-base font-semibold">Nothing here yet</p>
      <p class="mx-auto mt-2 max-w-sm text-sm text-neutral-600">{{ emptyCopy }}</p>
      <UiButton v-if="!account" class="mt-4" to="/start">Get started</UiButton>
      <UiButton v-else class="mt-4" variant="secondary" to="/discover">Find people</UiButton>
    </div>
    <NetworkPostCard
      v-for="item in visible"
      :key="item.event.id"
      :event="item.event"
      :name="item.name"
      :picture="item.picture"
      :npub="item.npub"
      :member="item.member"
      :owned="item.event.pubkey === account?.pubkey"
      @mute="mute"
    />
  </section>
</template>

<script setup lang="ts">
import { FEED_MODES, type FeedMode } from '~/utils/network/constants'
import type { NostrEvent } from '~/composables/useNostr'

const props = defineProps<{
  guest?: boolean
}>()

const account = useNetworkAccount()
const { query, profiles, signAndPublish } = useNostr()
const active = ref<FeedMode>(props.guest ? 'trends' : 'following')
const status = ref<'loading' | 'ready' | 'error'>('loading')
const notes = ref<NostrEvent[]>([])
const names = ref<Record<string, { name: string, picture: string, npub: string }>>({})
const follows = ref<string[]>([])
const mutes = ref<string[]>([])
const members = ref<Set<string>>(new Set())
const location = ref('')
const interests = ref<string[]>([])
const draft = ref('')
const posting = ref(false)
const postError = ref('')

const emptyCopy = computed(() => {
  if (active.value === 'following') return 'Follow a few people. Their posts show up here, and only here, in this tab.'
  if (active.value === 'local') return location.value ? 'No recent public posts matched your location.' : 'Add a location on your profile to use Local.'
  return 'No public posts matched this feed.'
})

const visible = computed(() => notes.value
  .filter(event => !mutes.value.includes(event.pubkey))
  .filter(event => isReadableNote(event.content))
  .filter(event => matches(event))
  .map(event => ({
    event,
    name: names.value[event.pubkey]?.name || 'Nostr profile',
    picture: names.value[event.pubkey]?.picture || '',
    npub: names.value[event.pubkey]?.npub || '',
    member: members.value.has(event.pubkey),
  })))

function isReadableNote(content: string) {
  const trimmed = content.trim()
  if (!trimmed) return false
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return false
  return true
}

function matches(event: NostrEvent) {
  const text = event.content.toLowerCase()
  if (active.value === 'following') return follows.value.includes(event.pubkey)
  if (active.value === 'for_you') {
    return interests.value.some(interest => text.includes(interest.toLowerCase())) || follows.value.includes(event.pubkey)
  }
  if (active.value === 'local') return location.value ? text.includes(location.value.toLowerCase()) : false
  if (active.value === 'work') return /build|hiring|collaborat|project|founder|open source|looking for/.test(text)
  if (active.value === 'new_people') return !follows.value.includes(event.pubkey)
  if (active.value === 'serendipity') return !follows.value.includes(event.pubkey) && event.id.charCodeAt(0) % 2 === 0
  return true
}

async function select(mode: FeedMode) {
  active.value = mode
  if (account.value) {
    $fetch('/api/network/preferences', { method: 'POST', body: { feedMode: mode } }).catch(() => undefined)
  }
  await load()
}

async function load() {
  status.value = 'loading'
  try {
    if (account.value && !props.guest) {
      const me = await $fetch<{ mutes: string[], fields: Array<{ field_key: string, value: unknown }>, tags: Array<{ label: string }>, preferences: { feed_mode?: FeedMode } | null }>('/api/network/me')
      mutes.value = me.mutes || []
      interests.value = (me.tags || []).map(tag => tag.label)
      const loc = me.fields?.find(field => field.field_key === 'location')
      location.value = typeof loc?.value === 'string' ? loc.value : ''
      if (me.preferences?.feed_mode) active.value = me.preferences.feed_mode
      const lists = await query({ kinds: [3], authors: [account.value.pubkey], limit: 2 })
      const list = lists.sort((a, b) => b.created_at - a.created_at)[0]
      follows.value = list?.tags.filter(tag => tag[0] === 'p' && tag[1]).map(tag => tag[1] as string) || []
    }
    const filter = active.value === 'following' && follows.value.length
      ? { kinds: [1], authors: follows.value.slice(0, 80), limit: 40 }
      : { kinds: [1], limit: 40 }
    if (active.value === 'following' && !follows.value.length && account.value) {
      notes.value = []
      status.value = 'ready'
      return
    }
    const events = await query(filter)
    const unique = new Map<string, NostrEvent>()
    for (const event of events) unique.set(event.id, event)
    notes.value = [...unique.values()].sort((a, b) => b.created_at - a.created_at)
    const nip19 = await import('nostr-tools/nip19')
    const cache = await profiles(notes.value.map(event => event.pubkey))
    const next: typeof names.value = {}
    for (const event of notes.value) {
      const profileEvent = cache.get(event.pubkey)
      let name = 'Nostr profile'
      let picture = ''
      if (profileEvent) {
        try {
          const meta = JSON.parse(profileEvent.content) as { name?: string, display_name?: string, picture?: string }
          name = meta.display_name || meta.name || name
          picture = meta.picture || ''
        } catch { /* unsigned profile text is ignored */ }
      }
      next[event.pubkey] = { name, picture, npub: nip19.npubEncode(event.pubkey) }
    }
    names.value = next
    status.value = 'ready'
    if (notes.value.length) {
      $fetch('/api/network/events', { method: 'POST', body: { events: notes.value.slice(0, 20) } }).catch(() => undefined)
    }
  } catch {
    status.value = 'error'
  }
}

async function publishPost() {
  posting.value = true
  postError.value = ''
  try {
    await signAndPublish({ kind: 1, content: draft.value.trim(), tags: [] })
    draft.value = ''
    await load()
  } catch (error) {
    postError.value = error instanceof Error ? error.message : 'The post did not publish.'
  } finally {
    posting.value = false
  }
}

function mute(pubkey: string) {
  mutes.value = [...mutes.value, pubkey]
  if (account.value) {
    $fetch('/api/network/mutes', { method: 'POST', body: { targetPubkey: pubkey } }).catch(() => undefined)
  }
}

onMounted(load)
</script>
