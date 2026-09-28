<template>
  <NetworkAppShell>
    <form class="px-4 py-6" @submit.prevent="save">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h1 class="text-xl font-semibold">Profile</h1>
          <p v-if="npub" class="mt-1 break-all font-mono text-xs text-neutral-500">{{ npub }}</p>
        </div>
        <UiButton v-if="npub" size="sm" variant="secondary" :to="`/u/${npub}`">View</UiButton>
      </div>
      <p class="mt-3 max-w-prose text-sm leading-relaxed text-neutral-600">Name, photo, and bio are published with your account. Everything else is only used to find people.</p>

      <div class="mt-5 flex items-center gap-3">
        <img v-if="picture" :src="picture" alt="" class="size-14 rounded-ui border border-neutral-200 object-cover">
        <span v-else class="flex size-14 items-center justify-center rounded-ui border border-neutral-200 bg-spring-wood-100 text-lg font-semibold">{{ initial }}</span>
        <p class="text-sm text-neutral-600">{{ name || 'Add your name' }}</p>
      </div>

      <div class="mt-5 grid gap-4">
        <UiInput v-model="name" label="Name" autocomplete="name" />
        <UiInput v-model="picture" label="Photo" placeholder="https://" description="A link to an image. Leave blank to use an initial." />
        <UiTextarea v-model="bio" label="Bio" :rows="4" />
        <UiInput v-model="location" label="Location" description="A city is enough." />
        <UiInput v-model="website" label="Website" placeholder="https://" />
      </div>

      <h2 class="mt-8 text-lg font-semibold">How people find you</h2>
      <div class="mt-4 grid gap-4">
        <NetworkChipField v-model="roles" label="Roles" placeholder="Add a role and press enter" />
        <NetworkChipField v-model="languages" label="Languages" placeholder="Add a language and press enter" />
        <NetworkChipField v-model="skills" label="Skills" placeholder="Add a skill and press enter" />
        <NetworkChipField v-model="interests" label="Interests" placeholder="Add an interest and press enter" />
        <NetworkChipField v-model="lookingFor" label="Looking for" placeholder="Add something you want" />
        <NetworkChipField v-model="canOffer" label="Can offer" placeholder="Add something you can offer" />
      </div>

      <UiButton class="mt-6" type="submit" :loading="saving">Save profile</UiButton>
      <p v-if="message" class="mt-3 text-sm">{{ message }}</p>
    </form>

    <section class="border-t border-neutral-200 px-4 py-6">
      <h2 class="text-lg font-semibold">What you want right now</h2>
      <p class="mt-1 text-sm text-neutral-600">One active intent steers Discover. Older ones stay here.</p>
      <form class="mt-4" @submit.prevent="addIntent">
        <UiTextarea v-model="intentText" label="Intent" :rows="3" placeholder="Find people building open-source tools" />
        <UiButton class="mt-3" type="submit" variant="secondary" :disabled="!intentText.trim()">Save and make active</UiButton>
      </form>
      <ul class="mt-4 space-y-2">
        <li v-for="intent in intents" :key="intent.id" class="flex items-start justify-between gap-3 border border-neutral-200 px-3 py-2 text-sm">
          <span>{{ intent.text }} <span v-if="intent.is_active" class="font-mono text-xs uppercase text-neutral-500">Active</span></span>
          <button v-if="!intent.is_active" class="text-brand-blue" type="button" @click="activate(intent.id)">Use</button>
        </li>
      </ul>
    </section>
  </NetworkAppShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Profile', path: '/profile', noindex: true })

const account = useNetworkAccount()
const { signAndPublish } = useNostr()
const name = ref('')
const bio = ref('')
const picture = ref('')
const location = ref('')
const website = ref('')
const roles = ref<string[]>([])
const languages = ref<string[]>([])
const skills = ref<string[]>([])
const interests = ref<string[]>([])
const lookingFor = ref<string[]>([])
const canOffer = ref<string[]>([])
const saving = ref(false)
const message = ref('')
const intentText = ref('')
const npub = ref('')
const intents = ref<Array<{ id: string, text: string, is_active: boolean }>>([])
const initial = computed(() => (name.value.trim() || 'L').slice(0, 1).toUpperCase())

function asList(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : []
}

function tagsOf(kind: 'skill' | 'interest' | 'role' | 'language', labels: string[]) {
  return labels.map(label => ({ kind, label, visibility: 'public' as const }))
}

async function load() {
  const nip19 = await import('nostr-tools/nip19')
  if (account.value) npub.value = nip19.npubEncode(account.value.pubkey)
  const me = await $fetch<{ fields: Array<{ field_key: string, value: unknown }>, tags: Array<{ kind: string, label: string }> }>('/api/network/me')
  const field = (key: string) => me.fields.find(item => item.field_key === key)?.value
  const text = (key: string) => typeof field(key) === 'string' ? field(key) as string : ''
  name.value = account.value?.displayName || text('name')
  bio.value = text('bio')
  picture.value = text('picture')
  location.value = text('location')
  website.value = text('website')
  lookingFor.value = asList(field('looking_for'))
  canOffer.value = asList(field('can_offer'))
  skills.value = me.tags.filter(tag => tag.kind === 'skill').map(tag => tag.label)
  interests.value = me.tags.filter(tag => tag.kind === 'interest').map(tag => tag.label)
  roles.value = me.tags.filter(tag => tag.kind === 'role').map(tag => tag.label)
  languages.value = me.tags.filter(tag => tag.kind === 'language').map(tag => tag.label)
  const response = await $fetch<{ intents: typeof intents.value }>('/api/network/intents')
  intents.value = response.intents
}

async function save() {
  saving.value = true
  message.value = ''
  try {
    await $fetch('/api/network/profile', {
      method: 'PUT',
      body: {
        displayName: name.value,
        fields: [
          { fieldGroup: 'identity', fieldKey: 'name', value: name.value, visibility: 'public', source: 'user', confirmed: true, publishedToNostr: true },
          { fieldGroup: 'identity', fieldKey: 'bio', value: bio.value, visibility: 'public', source: 'user', confirmed: true, publishedToNostr: true },
          { fieldGroup: 'identity', fieldKey: 'picture', value: picture.value, visibility: 'public', source: 'user', confirmed: true, publishedToNostr: true },
          { fieldGroup: 'identity', fieldKey: 'location', value: location.value, visibility: 'public', source: 'user', confirmed: true },
          { fieldGroup: 'identity', fieldKey: 'website', value: website.value, visibility: 'public', source: 'user', confirmed: true, publishedToNostr: true },
          { fieldGroup: 'direction', fieldKey: 'looking_for', value: lookingFor.value, visibility: 'discovery', source: 'user', confirmed: true },
          { fieldGroup: 'direction', fieldKey: 'can_offer', value: canOffer.value, visibility: 'discovery', source: 'user', confirmed: true },
        ],
        tags: [
          ...tagsOf('skill', skills.value),
          ...tagsOf('interest', interests.value),
          ...tagsOf('role', roles.value),
          ...tagsOf('language', languages.value),
        ],
      },
    })
    await signAndPublish({
      kind: 0,
      content: JSON.stringify({
        name: name.value,
        display_name: name.value,
        about: bio.value,
        picture: picture.value,
        website: website.value,
      }),
      tags: [],
    })
    if (account.value) account.value = { ...account.value, displayName: name.value }
    message.value = 'Saved. Name, photo, and bio were published with your account.'
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'Could not save.'
  } finally {
    saving.value = false
  }
}

async function addIntent() {
  await $fetch('/api/network/intents', { method: 'POST', body: { text: intentText.value, makeActive: true } })
  intentText.value = ''
  await load()
}

async function activate(id: string) {
  await $fetch(`/api/network/intents/${id}`, { method: 'PATCH', body: { active: true } })
  await load()
}

onMounted(load)
</script>
