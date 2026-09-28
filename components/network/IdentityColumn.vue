<template>
  <aside class="bg-white px-4 py-5">
    <div v-if="account" class="flex gap-3" :class="variant === 'column' ? 'flex-col' : 'items-start'">
      <nuxt-link :to="profileHref" class="shrink-0">
        <img v-if="picture && !pictureFailed" :src="picture" alt="" class="rounded-ui border border-neutral-200 object-cover" :class="variant === 'column' ? 'size-16' : 'size-12'" @error="pictureFailed = true">
        <span v-else class="flex items-center justify-center rounded-ui border border-neutral-200 bg-spring-wood-100 font-semibold" :class="variant === 'column' ? 'size-16 text-lg' : 'size-12 text-base'">{{ initial }}</span>
      </nuxt-link>
      <div class="min-w-0">
        <nuxt-link :to="profileHref" class="block truncate text-base font-semibold hover:underline">{{ display }}</nuxt-link>
        <p v-if="handle" class="truncate font-mono text-xs text-neutral-500">{{ handle }}</p>
        <p v-if="bio" class="mt-2 text-sm leading-relaxed text-neutral-700" :class="variant === 'column' ? 'line-clamp-5' : 'line-clamp-3'">{{ bio }}</p>
        <p v-if="location" class="mt-2 font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">{{ location }}</p>
        <p v-if="interests.length" class="mt-2 text-sm text-neutral-600">{{ interests.slice(0, 3).join(' · ') }}</p>
        <nuxt-link to="/profile" class="mt-3 inline-block text-sm text-brand-blue">Edit profile</nuxt-link>
      </div>
    </div>

    <div v-else>
      <p class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">Your profile</p>
      <h2 class="mt-2 text-lg font-semibold leading-snug">Create an account, or sign in.</h2>
      <p class="mt-2 text-sm leading-relaxed text-neutral-600">You can read the feed without one. An account is how people see your name and photo here.</p>
      <div class="mt-4 grid gap-2">
        <UiButton to="/start">Create account</UiButton>
        <UiButton variant="secondary" to="/start?signin=1">Sign in</UiButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { readProfileContent, shortNpub } from '~/utils/network/format'

withDefaults(defineProps<{
  variant?: 'column' | 'sidebar'
}>(), {
  variant: 'column',
})

const account = useNetworkAccount()
const { profiles } = useNostr()
const picture = ref('')
const bio = ref('')
const location = ref('')
const npub = ref('')
const interests = ref<string[]>([])
const pictureFailed = ref(false)

const display = computed(() => account.value?.displayName?.trim() || 'Your profile')
const handle = computed(() => npub.value ? shortNpub(npub.value) : '')
const initial = computed(() => display.value.slice(0, 1).toUpperCase())
const profileHref = computed(() => npub.value ? `/u/${npub.value}` : '/profile')

async function load() {
  pictureFailed.value = false
  picture.value = ''
  bio.value = ''
  location.value = ''
  npub.value = ''
  interests.value = []
  if (!account.value) return
  const nip19 = await import('nostr-tools/nip19')
  npub.value = nip19.npubEncode(account.value.pubkey)
  try {
    const me = await $fetch<{
      fields: Array<{ field_key: string, value: unknown }>
      tags: Array<{ kind: string, label: string }>
    }>('/api/network/me')
    const field = (key: string) => me.fields.find(item => item.field_key === key)?.value
    const text = (key: string) => typeof field(key) === 'string' ? (field(key) as string).trim() : ''
    picture.value = text('picture')
    bio.value = text('bio')
    location.value = text('location')
    interests.value = me.tags.filter(tag => tag.kind === 'interest').map(tag => tag.label)
  } catch {
    /* public browse still renders the sign-in panel */
  }
  if (!picture.value || !bio.value) {
    const cache = await profiles([account.value.pubkey])
    const meta = readProfileContent(cache.get(account.value.pubkey)?.content)
    if (!picture.value) picture.value = meta.picture
    if (!bio.value) bio.value = meta.about
  }
}

watch(account, () => { void load() })
onMounted(load)
</script>
