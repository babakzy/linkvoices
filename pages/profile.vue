<template>
  <NetworkAppShell>
    <form class="px-4 py-6" @submit.prevent="save">
      <h1 class="text-xl font-semibold">Your profile</h1>
      <p class="mt-2 max-w-prose text-sm text-neutral-600">Name and bio can be published to the open network. The rest stays here unless you mark it public.</p>
      <div class="mt-4 grid gap-4">
        <UiInput v-model="name" label="Name" />
        <UiTextarea v-model="bio" label="Bio" :rows="4" />
        <UiInput v-model="location" label="Location" description="A city is enough. This is not your exact address." />
        <UiInput v-model="skills" label="Skills" description="Comma separated." />
        <UiInput v-model="interests" label="Interests" description="Comma separated." />
        <UiTextarea v-model="lookingFor" label="Looking for" :rows="3" />
        <UiTextarea v-model="canOffer" label="What I can offer" :rows="3" />
      </div>
      <UiButton class="mt-4" type="submit" :loading="saving">Save profile</UiButton>
      <p v-if="message" class="mt-3 text-sm">{{ message }}</p>
    </form>
    <section class="border-t border-neutral-200 px-4 py-6">
      <h2 class="text-lg font-semibold">What you want right now</h2>
      <form class="mt-3" @submit.prevent="addIntent">
        <UiTextarea v-model="intentText" label="Intent" :rows="3" placeholder="Find people building open-source AI tools" />
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
const location = ref('')
const skills = ref('')
const interests = ref('')
const lookingFor = ref('')
const canOffer = ref('')
const saving = ref(false)
const message = ref('')
const intentText = ref('')
const intents = ref<Array<{ id: string, text: string, is_active: boolean }>>([])

function list(value: string) {
  return value.split(',').map(item => item.trim()).filter(Boolean)
}

async function load() {
  const me = await $fetch<{ fields: Array<{ field_key: string, value: unknown }>, tags: Array<{ kind: string, label: string }> }>('/api/network/me')
  const field = (key: string) => me.fields.find(item => item.field_key === key)?.value
  name.value = account.value?.displayName || (typeof field('name') === 'string' ? field('name') as string : '')
  bio.value = typeof field('bio') === 'string' ? field('bio') as string : ''
  location.value = typeof field('location') === 'string' ? field('location') as string : ''
  lookingFor.value = Array.isArray(field('looking_for')) ? (field('looking_for') as string[]).join(', ') : ''
  canOffer.value = Array.isArray(field('can_offer')) ? (field('can_offer') as string[]).join(', ') : ''
  skills.value = me.tags.filter(tag => tag.kind === 'skill').map(tag => tag.label).join(', ')
  interests.value = me.tags.filter(tag => tag.kind === 'interest').map(tag => tag.label).join(', ')
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
          { fieldGroup: 'identity', fieldKey: 'location', value: location.value, visibility: 'public', source: 'user', confirmed: true },
          { fieldGroup: 'direction', fieldKey: 'looking_for', value: list(lookingFor.value), visibility: 'discovery', source: 'user', confirmed: true },
          { fieldGroup: 'direction', fieldKey: 'can_offer', value: list(canOffer.value), visibility: 'discovery', source: 'user', confirmed: true },
        ],
        tags: [
          ...list(skills.value).map(label => ({ kind: 'skill' as const, label, visibility: 'public' as const })),
          ...list(interests.value).map(label => ({ kind: 'interest' as const, label, visibility: 'public' as const })),
        ],
      },
    })
    await signAndPublish({
      kind: 0,
      content: JSON.stringify({ name: name.value, display_name: name.value, about: bio.value }),
      tags: [],
    })
    message.value = 'Saved. Name and bio were published with your account.'
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
