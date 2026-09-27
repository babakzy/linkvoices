<template>
  <div class="min-h-screen bg-white">
    <Header />
    <main class="mx-auto max-w-xl px-4 py-12">
      <section v-if="step === 'choose'">
        <h1 class="text-3xl font-semibold leading-tight">How do you want to start?</h1>
        <div class="mt-6 grid gap-3">
          <button class="border border-ink bg-ink px-4 py-3 text-left text-white" type="button" @click="step = 'password'">
            <span class="block text-sm font-semibold">Get started</span>
            <span class="mt-1 block text-sm text-white/80">Create an account on this device.</span>
          </button>
          <button class="border border-neutral-300 bg-white px-4 py-3 text-left" type="button" @click="step = 'existing'">
            <span class="block text-sm font-semibold">I already use Nostr</span>
          </button>
          <nuxt-link class="border border-neutral-300 px-4 py-3 text-sm" to="/explore">Look around first</nuxt-link>
        </div>
      </section>

      <section v-else-if="step === 'password'">
        <h1 class="text-3xl font-semibold">Email and password</h1>
        <p class="mt-2 text-sm text-neutral-600">Works everywhere. Your recovery key is created here and encrypted before it is saved.</p>
        <form class="mt-6 grid gap-4" @submit.prevent="createWithPassword">
          <UiInput v-model="name" label="Name" autocomplete="name" />
          <UiInput v-model="email" label="Email" type="email" autocomplete="email" required />
          <UiInput v-model="password" label="Password" type="password" autocomplete="new-password" required description="At least 8 characters." />
          <label class="flex items-start gap-2 text-sm">
            <input v-model="withPhrase" type="checkbox" class="mt-1">
            <span>Also save a recovery phrase. If you skip it and forget the password, the account cannot be restored.</span>
          </label>
          <p v-if="error" class="text-sm text-red-700">{{ error }}</p>
          <UiButton type="submit" :loading="busy">Create account</UiButton>
        </form>
      </section>

      <section v-else-if="step === 'phrase'">
        <h1 class="text-3xl font-semibold">Save this phrase</h1>
        <p class="mt-2 text-sm leading-relaxed">Write it down. We can't reset this for you. That's the trade for an account nobody can take away from you.</p>
        <p class="mt-4 border border-neutral-300 bg-spring-wood-100 p-4 font-mono text-sm leading-relaxed">{{ phrase }}</p>
        <label class="mt-4 flex items-start gap-2 text-sm">
          <input v-model="phraseSaved" type="checkbox" class="mt-1">
          <span>I saved this phrase somewhere I can find later.</span>
        </label>
        <UiButton class="mt-4" :disabled="!phraseSaved" @click="finishPhrase">Continue</UiButton>
      </section>

      <section v-else-if="step === 'existing'">
        <h1 class="text-3xl font-semibold">Bring an existing account</h1>
        <div class="mt-6 grid gap-3">
          <UiButton @click="connectExtension">Browser extension</UiButton>
          <p class="text-sm text-neutral-600">Preferred. The key never enters Linkvoices.</p>
          <form class="mt-4 grid gap-3 border-t border-neutral-200 pt-4" @submit.prevent="importKey">
            <UiTextarea v-model="nsec" label="Recovery key" description="Accepted, but discouraged. It is encrypted in this browser before anything is saved." :rows="3" />
            <UiInput v-model="email" label="Email" type="email" required />
            <UiInput v-model="password" label="Password" type="password" required />
            <UiButton type="submit" variant="secondary" :loading="busy">Encrypt and continue</UiButton>
          </form>
          <p v-if="error" class="text-sm text-red-700">{{ error }}</p>
        </div>
      </section>

      <section v-else-if="step === 'ready'">
        <h1 class="text-3xl font-semibold">Your account is ready.</h1>
        <p class="mt-3 text-base leading-relaxed">It belongs to you, not to us. It also works on other Nostr apps, so you can leave any time and keep your profile and your people.</p>
        <UiButton class="mt-6" @click="step = 'interests'">Continue</UiButton>
      </section>

      <section v-else-if="step === 'interests'">
        <h1 class="text-3xl font-semibold">What do you care about?</h1>
        <p class="mt-2 text-sm text-neutral-600">Pick at least three. Skip this and suggestions will be less relevant.</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <button
            v-for="interest in INTERESTS"
            :key="interest"
            type="button"
            class="rounded-ui border px-3 py-2 text-sm"
            :class="selectedInterests.includes(interest) ? 'border-ink bg-ink text-white' : 'border-neutral-300 bg-white'"
            @click="toggleInterest(interest)"
          >
            {{ interest }}
          </button>
        </div>
        <div class="mt-6 flex gap-2">
          <UiButton :disabled="selectedInterests.length < 3" @click="saveInterests">Continue</UiButton>
          <UiButton variant="ghost" @click="step = 'profile'">Skip for now</UiButton>
        </div>
      </section>

      <section v-else-if="step === 'profile'">
        <h1 class="text-3xl font-semibold">Build your profile</h1>
        <div class="mt-4 flex gap-2">
          <UiButton :variant="profileMode === 'import' ? 'primary' : 'secondary'" @click="profileMode = 'import'">Use the AI I already use</UiButton>
          <UiButton :variant="profileMode === 'interview' ? 'primary' : 'secondary'" @click="profileMode = 'interview'">Answer a few questions</UiButton>
        </div>
        <div v-if="profileMode === 'import'" class="mt-4">
          <p class="text-sm">Copy this into ChatGPT or Claude, then paste the JSON back.</p>
          <textarea readonly class="mt-2 w-full border border-neutral-300 p-3 font-mono text-xs" rows="8" :value="PROFILE_PROMPT" />
          <UiButton class="mt-2" variant="secondary" @click="copyPrompt">Copy prompt</UiButton>
          <UiTextarea v-model="importText" class="mt-4" label="Paste the result" :rows="8" />
          <UiButton class="mt-3" :disabled="!importText.trim()" @click="reviewImport">Review</UiButton>
        </div>
        <form v-else class="mt-4 grid gap-4" @submit.prevent="reviewInterview">
          <UiTextarea v-model="answers.work" label="What are you working on these days?" :rows="3" />
          <UiTextarea v-model="answers.offer" label="What can you offer people?" :rows="3" />
          <UiTextarea v-model="answers.need" label="What are you looking for?" :rows="3" />
          <UiButton type="submit">Review</UiButton>
        </form>
        <UiButton class="mt-4" variant="ghost" @click="step = 'follows'">Skip for now</UiButton>
        <div v-if="review" class="mt-6 border border-neutral-200 p-4">
          <p class="font-mono text-xs uppercase tracking-[0.06em]">Review before saving</p>
          <pre class="mt-2 whitespace-pre-wrap text-sm">{{ review }}</pre>
          <UiButton class="mt-3" :loading="busy" @click="saveReview">Save this</UiButton>
        </div>
        <p v-if="error" class="mt-3 text-sm text-red-700">{{ error }}</p>
      </section>

      <section v-else-if="step === 'follows'">
        <h1 class="text-3xl font-semibold">People to follow</h1>
        <p class="mt-2 text-sm text-neutral-600">Real accounts from the open network. Remove anyone you don't want.</p>
        <label v-for="person in suggestions" :key="person.npub" class="mt-3 flex gap-3 border border-neutral-200 p-3 text-sm">
          <input v-model="person.selected" type="checkbox" class="mt-1">
          <span>
            <span class="font-semibold">{{ person.name }}</span>
            <span class="mt-1 block text-neutral-600">{{ person.reason }}</span>
          </span>
        </label>
        <UiButton class="mt-4" :loading="busy" @click="followSelected">Follow and open the feed</UiButton>
        <p v-if="error" class="mt-3 text-sm text-red-700">{{ error }}</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { INTERESTS, PROFILE_PROMPT, SUGGESTED_PEOPLE } from '~/utils/network/constants'
import { asStringList, parseProfileJson } from '~/utils/network/format'
import { aesEncrypt, derivePasswordMaterial } from '~/utils/network/crypto'
import { randomBytes } from '~/utils/network/bytes'
import { setSecretKey } from '~/utils/network/keyStore'

definePageMeta({ layout: false })
usePageSeo({
  title: 'Get started',
  description: 'Create your Linkvoices account and find people worth knowing.',
  path: '/start',
})

const route = useRoute()
const account = useNetworkAccount()
const { signAndPublish } = useNostr()
const step = ref(route.query.existing ? 'existing' : 'choose')
const name = ref('')
const email = ref('')
const password = ref('')
const withPhrase = ref(true)
const phrase = ref('')
const phraseSaved = ref(false)
const nsec = ref('')
const busy = ref(false)
const error = ref('')
const selectedInterests = ref<string[]>([])
const profileMode = ref<'import' | 'interview'>('import')
const importText = ref('')
const review = ref('')
const parsed = ref<Record<string, unknown> | null>(null)
const answers = reactive({ work: '', offer: '', need: '' })
const suggestions = ref(SUGGESTED_PEOPLE.map(person => ({ ...person, selected: true })))

function toggleInterest(interest: string) {
  selectedInterests.value = selectedInterests.value.includes(interest)
    ? selectedInterests.value.filter(item => item !== interest)
    : [...selectedInterests.value, interest]
}

async function copyPrompt() {
  await navigator.clipboard.writeText(PROFILE_PROMPT)
}

async function createWithPassword() {
  error.value = ''
  if (password.value.length < 8) {
    error.value = 'Use at least 8 characters.'
    return
  }
  busy.value = true
  try {
    const { generateSecretKey, getPublicKey } = await import('nostr-tools/pure')
    const secret = generateSecretKey()
    await registerManaged(secret, getPublicKey(secret))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not create the account.'
  } finally {
    busy.value = false
  }
}

async function registerManaged(secret: Uint8Array, pubkey: string) {
  const dek = randomBytes(32)
  const encryptedKey = await aesEncrypt(dek, secret)
  const material = derivePasswordMaterial(password.value)
  const passwordWrap = await aesEncrypt(material.wrappingKey, dek)
  const wraps: Array<Record<string, unknown>> = [{
    method: 'password',
    wrappedDek: passwordWrap.ciphertext,
    nonce: passwordWrap.nonce,
    kdfParams: material.kdfParams,
    label: 'Password',
  }]
  if (withPhrase.value) {
    const { generateMnemonic, mnemonicToSeedSync } = await import('@scure/bip39')
    const { wordlist } = await import('@scure/bip39/wordlists/english.js')
    phrase.value = generateMnemonic(wordlist, 128)
    const seed = mnemonicToSeedSync(phrase.value)
    const phraseWrap = await aesEncrypt(seed.slice(0, 32), dek)
    wraps.push({
      method: 'recovery_phrase',
      wrappedDek: phraseWrap.ciphertext,
      nonce: phraseWrap.nonce,
      kdfParams: { name: 'bip39', words: 12 },
      label: 'Recovery phrase',
    })
  }
  const response = await $fetch<{ account: { id: string, pubkey: string, custodyMode: 'managed_encrypted', displayName: string | null } }>('/api/network/register', {
    method: 'POST',
    body: {
      pubkey,
      displayName: name.value,
      email: email.value,
      passwordVerifier: material.verifier,
      encryptedKey,
      wraps,
    },
  })
  setSecretKey(secret)
  account.value = response.account
  if (name.value) {
    await signAndPublish({
      kind: 0,
      content: JSON.stringify({ name: name.value, display_name: name.value }),
      tags: [],
    }).catch(() => undefined)
  }
  step.value = withPhrase.value ? 'phrase' : 'ready'
}

function finishPhrase() {
  step.value = 'ready'
}

async function connectExtension() {
  error.value = ''
  const nostr = (window as Window & { nostr?: { signEvent: (event: { kind: number, content: string, tags: string[][], created_at: number }) => Promise<unknown> } }).nostr
  if (!nostr) {
    error.value = 'No browser extension was found.'
    return
  }
  busy.value = true
  try {
    const challenge = await $fetch<{ id: string, challenge: string }>('/api/network/challenge', { method: 'POST' })
    const signed = await nostr.signEvent({
      kind: 1,
      content: challenge.challenge,
      tags: [],
      created_at: Math.floor(Date.now() / 1000),
    })
    const response = await $fetch<{ account: { id: string, pubkey: string, custodyMode: 'nip07', displayName: string | null } }>('/api/network/claim', {
      method: 'POST',
      body: { challengeId: challenge.id, event: signed },
    })
    account.value = response.account
    step.value = 'ready'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not connect the extension.'
  } finally {
    busy.value = false
  }
}

async function importKey() {
  error.value = ''
  busy.value = true
  try {
    const nip19 = await import('nostr-tools/nip19')
    const { getPublicKey } = await import('nostr-tools/pure')
    const decoded = nip19.decode(nsec.value.trim())
    if (decoded.type !== 'nsec') throw new Error('That recovery key is not valid.')
    withPhrase.value = false
    await registerManaged(decoded.data, getPublicKey(decoded.data))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not import that key.'
  } finally {
    busy.value = false
  }
}

async function saveInterests() {
  await $fetch('/api/network/profile', {
    method: 'PUT',
    body: {
      tags: selectedInterests.value.map(label => ({ kind: 'interest', label, visibility: 'public' })),
    },
  })
  step.value = 'profile'
}

function reviewImport() {
  parsed.value = parseProfileJson(importText.value)
  if (!parsed.value) {
    error.value = 'Paste the JSON the assistant returned.'
    return
  }
  error.value = ''
  review.value = JSON.stringify(parsed.value, null, 2)
}

function reviewInterview() {
  parsed.value = {
    bio: answers.work,
    can_offer: answers.offer ? [answers.offer] : [],
    looking_for: answers.need ? [answers.need] : [],
  }
  review.value = JSON.stringify(parsed.value, null, 2)
}

async function saveReview() {
  if (!parsed.value) return
  busy.value = true
  const data = parsed.value
  await $fetch('/api/network/profile', {
    method: 'PUT',
    body: {
      displayName: typeof data.name === 'string' ? data.name : name.value,
      fields: [
        { fieldGroup: 'identity', fieldKey: 'bio', value: typeof data.bio === 'string' ? data.bio : '', visibility: 'public', source: profileMode.value === 'import' ? 'ai_import' : 'ai_interview', confirmed: true, publishedToNostr: true },
        { fieldGroup: 'identity', fieldKey: 'location', value: typeof data.location === 'string' ? data.location : '', visibility: 'public', source: 'user', confirmed: true },
        { fieldGroup: 'direction', fieldKey: 'looking_for', value: asStringList(data.looking_for), visibility: 'discovery', source: profileMode.value === 'import' ? 'ai_import' : 'ai_interview', confirmed: true },
        { fieldGroup: 'direction', fieldKey: 'can_offer', value: asStringList(data.can_offer), visibility: 'discovery', source: profileMode.value === 'import' ? 'ai_import' : 'ai_interview', confirmed: true },
      ],
      tags: [
        ...asStringList(data.skills).map(label => ({ kind: 'skill' as const, label, visibility: 'public' as const })),
        ...asStringList(data.interests).map(label => ({ kind: 'interest' as const, label, visibility: 'public' as const })),
      ],
    },
  })
  busy.value = false
  step.value = 'follows'
}

async function followSelected() {
  busy.value = true
  error.value = ''
  try {
    const nip19 = await import('nostr-tools/nip19')
    const tags = suggestions.value.filter(person => person.selected).map((person) => {
      const decoded = nip19.decode(person.npub)
      if (decoded.type !== 'npub') return null
      return ['p', decoded.data]
    }).filter((tag): tag is string[] => Boolean(tag))
    if (tags.length) await signAndPublish({ kind: 3, content: '', tags })
    const next = typeof route.query.next === 'string' ? route.query.next : '/home'
    await navigateTo(next.startsWith('/') ? next : '/home')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not follow those accounts.'
  } finally {
    busy.value = false
  }
}
</script>
