<template>
  <div class="min-h-screen bg-white">
    <Header />
    <main class="mx-auto max-w-lg px-4 py-10">
      <button v-if="canGoBack" class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500" type="button" @click="goBack">Back</button>
      <p v-if="progress" class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">{{ progress }}</p>

      <section v-if="step === 'choose'" class="mt-4">
        <h1 class="text-3xl font-semibold leading-tight">Create your account</h1>
        <p class="mt-3 text-base leading-relaxed text-neutral-700">It works in this browser, and you can take it with you if you leave.</p>
        <div class="mt-6 grid gap-3">
          <UiButton @click="step = 'password'">Get started</UiButton>
          <UiButton variant="secondary" @click="step = 'signin'">I already have an account</UiButton>
          <UiButton variant="ghost" @click="step = 'existing'">I already use another app</UiButton>
          <nuxt-link class="text-center text-sm text-brand-blue" to="/explore">Look around first</nuxt-link>
        </div>
      </section>

      <section v-else-if="step === 'signin'" class="mt-4">
        <h1 class="text-3xl font-semibold">Sign in</h1>
        <p class="mt-2 text-sm leading-relaxed text-neutral-600">Use the email and password from this device. Your key stays in memory for this visit.</p>
        <form class="mt-6 grid gap-4" @submit.prevent="signIn">
          <UiInput v-model="email" label="Email" type="email" autocomplete="email" required />
          <UiInput v-model="password" label="Password" type="password" autocomplete="current-password" required />
          <p v-if="error" class="text-sm text-red-700">{{ error }}</p>
          <UiButton type="submit" :loading="busy">Sign in</UiButton>
        </form>
      </section>

      <section v-else-if="step === 'password'" class="mt-4">
        <h1 class="text-3xl font-semibold">Email and password</h1>
        <p class="mt-2 text-sm leading-relaxed text-neutral-600">This is how you get back in. The recovery key is created here and encrypted before it is saved.</p>
        <form class="mt-6 grid gap-4" @submit.prevent="createWithPassword">
          <UiInput v-model="name" label="Name" autocomplete="name" />
          <UiInput v-model="email" label="Email" type="email" autocomplete="email" required />
          <UiInput v-model="password" label="Password" type="password" autocomplete="new-password" required description="At least 8 characters." />
          <label class="flex items-start gap-2 text-sm">
            <input v-model="withPhrase" type="checkbox" class="mt-1">
            <span>Also save a recovery phrase. Skip it, and a forgotten password cannot be reset.</span>
          </label>
          <p v-if="error" class="text-sm text-red-700">{{ error }}</p>
          <UiButton type="submit" :loading="busy">Create account</UiButton>
        </form>
      </section>

      <section v-else-if="step === 'creating'" class="mt-16 text-center">
        <UiSpinner class="mx-auto" />
        <p class="mt-4 text-sm">Creating your account.</p>
      </section>

      <section v-else-if="step === 'phrase'" class="mt-4">
        <h1 class="text-3xl font-semibold">Save this phrase</h1>
        <p class="mt-2 text-sm leading-relaxed">Write these 12 words down. We can't reset them for you. That's the trade for an account nobody can take away.</p>
        <ol class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <li v-for="(word, index) in phraseWords" :key="`${index}-${word}`" class="border border-neutral-300 bg-spring-wood-100 px-3 py-2 font-mono text-sm">
            <span class="mr-2 text-neutral-500">{{ index + 1 }}</span>{{ word }}
          </li>
        </ol>
        <UiButton class="mt-3" variant="secondary" @click="copyPhrase">{{ copied ? 'Copied' : 'Copy phrase' }}</UiButton>
        <label class="mt-4 flex items-start gap-2 text-sm">
          <input v-model="phraseSaved" type="checkbox" class="mt-1">
          <span>I saved this phrase somewhere I can find later.</span>
        </label>
        <UiButton class="mt-4" :disabled="!phraseSaved" @click="finishPhrase">Continue</UiButton>
      </section>

      <section v-else-if="step === 'existing'" class="mt-4">
        <h1 class="text-3xl font-semibold">Bring an existing account</h1>
        <p class="mt-2 text-sm leading-relaxed text-neutral-600">A browser extension is the safer way. The key never enters Linkvoices.</p>
        <div class="mt-6 grid gap-3">
          <UiButton @click="connectExtension">Use browser extension</UiButton>
          <form class="mt-2 grid gap-3 border-t border-neutral-200 pt-4" @submit.prevent="importKey">
            <UiTextarea v-model="nsec" label="Recovery key" description="Accepted if you don't have an extension. It is encrypted in this browser before anything is saved." :rows="3" />
            <UiInput v-model="email" label="Email" type="email" required />
            <UiInput v-model="password" label="Password" type="password" required />
            <UiButton type="submit" variant="secondary" :loading="busy">Encrypt and continue</UiButton>
          </form>
          <p v-if="error" class="text-sm text-red-700">{{ error }}</p>
        </div>
      </section>

      <section v-else-if="step === 'ready'" class="mt-4">
        <h1 class="text-3xl font-semibold">Your account is ready.</h1>
        <p class="mt-3 text-base leading-relaxed">It belongs to you, not to us. It also works on other Nostr apps, so you can leave any time and keep your profile and your people.</p>
        <UiButton class="mt-6" @click="step = 'interests'">Continue</UiButton>
      </section>

      <section v-else-if="step === 'interests'" class="mt-4">
        <h1 class="text-3xl font-semibold">What do you care about?</h1>
        <p class="mt-2 text-sm text-neutral-600">Pick at least three. This is what the feed and suggestions start from.</p>
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
        <p class="mt-3 font-mono text-xs text-neutral-500">{{ selectedInterests.length }} selected</p>
        <div class="mt-4 flex gap-2">
          <UiButton :disabled="selectedInterests.length < 3" @click="saveInterests">Continue</UiButton>
          <UiButton variant="ghost" @click="step = 'profile'">Skip for now</UiButton>
        </div>
      </section>

      <section v-else-if="step === 'profile'" class="mt-4">
        <h1 class="text-3xl font-semibold">Build your profile</h1>
        <p class="mt-2 text-sm text-neutral-600">You review everything before it is saved.</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <UiButton :variant="profileMode === 'import' ? 'primary' : 'secondary'" @click="profileMode = 'import'">Use an assistant I already have</UiButton>
          <UiButton :variant="profileMode === 'interview' ? 'primary' : 'secondary'" @click="profileMode = 'interview'">Answer three questions</UiButton>
        </div>
        <div v-if="profileMode === 'import'" class="mt-4">
          <p class="text-sm">Copy this into ChatGPT or Claude, then paste the result back.</p>
          <textarea readonly class="mt-2 w-full rounded-ui border border-neutral-300 p-3 font-mono text-xs" rows="6" :value="PROFILE_PROMPT" />
          <UiButton class="mt-2" variant="secondary" @click="copyPrompt">{{ copied ? 'Copied' : 'Copy prompt' }}</UiButton>
          <UiTextarea v-model="importText" class="mt-4" label="Paste the result" :rows="6" />
          <UiButton class="mt-3" :disabled="!importText.trim()" @click="reviewImport">Review</UiButton>
        </div>
        <form v-else class="mt-4 grid gap-4" @submit.prevent="reviewInterview">
          <UiTextarea v-model="answers.work" label="What are you working on these days?" :rows="3" />
          <UiTextarea v-model="answers.offer" label="What can you offer people?" :rows="3" />
          <UiTextarea v-model="answers.need" label="What are you looking for?" :rows="3" />
          <UiButton type="submit">Review</UiButton>
        </form>
        <div v-if="reviewRows.length" class="mt-6 border border-neutral-200 p-4">
          <p class="font-mono text-xs uppercase tracking-[0.06em]">Review before saving</p>
          <dl class="mt-3 space-y-3">
            <div v-for="row in reviewRows" :key="row.label">
              <dt class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">{{ row.label }}</dt>
              <dd class="mt-1 text-sm">{{ row.value }}</dd>
            </div>
          </dl>
          <UiButton class="mt-4" :loading="busy" @click="saveReview">Save this</UiButton>
        </div>
        <UiButton class="mt-4" variant="ghost" @click="step = 'follows'">Skip for now</UiButton>
        <p v-if="error" class="mt-3 text-sm text-red-700">{{ error }}</p>
      </section>

      <section v-else-if="step === 'follows'" class="mt-4">
        <h1 class="text-3xl font-semibold">People to follow</h1>
        <p class="mt-2 text-sm text-neutral-600">A few real accounts. Uncheck anyone you don't want.</p>
        <label v-for="person in suggestions" :key="person.npub" class="mt-3 flex gap-3 border border-neutral-200 p-3 text-sm">
          <input v-model="person.selected" type="checkbox" class="mt-1">
          <span>
            <span class="font-semibold">{{ person.name }}</span>
            <span class="mt-1 block text-neutral-600">{{ person.reason }}</span>
          </span>
        </label>
        <UiButton class="mt-4" :loading="busy" @click="followSelected">Follow and open the feed</UiButton>
        <UiButton class="mt-2" variant="ghost" @click="openFeed">Skip and open the feed</UiButton>
        <p v-if="error" class="mt-3 text-sm text-red-700">{{ error }}</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { INTERESTS, PROFILE_PROMPT, SUGGESTED_PEOPLE } from '~/utils/network/constants'
import { asStringList, parseProfileJson } from '~/utils/network/format'
import { aesDecrypt, aesEncrypt, derivePasswordMaterial, verifierFromPassword, wrappingKeyFromPassword } from '~/utils/network/crypto'
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
const step = ref(route.query.signin ? 'signin' : route.query.existing ? 'existing' : 'choose')
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
const parsed = ref<Record<string, unknown> | null>(null)
const copied = ref(false)
const answers = reactive({ work: '', offer: '', need: '' })
const suggestions = ref(SUGGESTED_PEOPLE.map(person => ({ ...person, selected: true })))

const phraseWords = computed(() => phrase.value.split(/\s+/).filter(Boolean))
const canGoBack = computed(() => ['password', 'signin', 'existing', 'interests', 'profile', 'follows'].includes(step.value))
const progress = computed(() => {
  const labels: Record<string, string> = {
    ready: 'Step 1 of 4 · Account',
    interests: 'Step 2 of 4 · Interests',
    profile: 'Step 3 of 4 · Profile',
    follows: 'Step 4 of 4 · People',
  }
  return labels[step.value] || ''
})
const reviewRows = computed(() => {
  const data = parsed.value
  if (!data) return []
  const rows = [
    ['Name', data.name],
    ['Bio', data.bio],
    ['Location', data.location],
    ['Skills', asStringList(data.skills).join(', ')],
    ['Interests', asStringList(data.interests).join(', ')],
    ['Looking for', asStringList(data.looking_for).join(', ')],
    ['Can offer', asStringList(data.can_offer).join(', ')],
  ]
  return rows
    .map(([label, value]) => ({ label: String(label), value: typeof value === 'string' ? value.trim() : '' }))
    .filter(row => row.value)
})

function goBack() {
  const previous: Record<string, string> = {
    password: 'choose',
    signin: 'choose',
    existing: 'choose',
    interests: 'ready',
    profile: 'interests',
    follows: 'profile',
  }
  error.value = ''
  parsed.value = null
  step.value = previous[step.value] || 'choose'
}

async function copyPhrase() {
  await navigator.clipboard.writeText(phrase.value)
  copied.value = true
}

async function openFeed() {
  const next = typeof route.query.next === 'string' ? route.query.next : '/home'
  await navigateTo(next.startsWith('/') ? next : '/home')
}

async function signIn() {
  error.value = ''
  busy.value = true
  try {
    const start = await $fetch<{ salt: string }>('/api/network/login-start', { method: 'POST', body: { email: email.value } })
    const login = await $fetch<{
      account: { id: string, pubkey: string, custodyMode: 'managed_encrypted', displayName: string | null }
      encryptedKey: { ciphertext: string, nonce: string } | null
      wraps: Array<{ method: string, wrapped_dek: string, nonce: string }>
    }>('/api/network/login', {
      method: 'POST',
      body: { email: email.value, verifier: verifierFromPassword(password.value, start.salt) },
    })
    const wrap = login.wraps.find(item => item.method === 'password')
    if (!login.encryptedKey || !wrap) throw new Error('This account has no stored key on this server.')
    const dek = await aesDecrypt(wrappingKeyFromPassword(password.value, start.salt), {
      ciphertext: wrap.wrapped_dek,
      nonce: wrap.nonce,
    })
    const secret = await aesDecrypt(dek, login.encryptedKey)
    setSecretKey(secret)
    account.value = login.account
    await openFeed()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not sign in.'
  } finally {
    busy.value = false
  }
}

function toggleInterest(interest: string) {
  selectedInterests.value = selectedInterests.value.includes(interest)
    ? selectedInterests.value.filter(item => item !== interest)
    : [...selectedInterests.value, interest]
}

async function copyPrompt() {
  await navigator.clipboard.writeText(PROFILE_PROMPT)
  copied.value = true
}

async function createWithPassword() {
  error.value = ''
  if (password.value.length < 8) {
    error.value = 'Use at least 8 characters.'
    return
  }
  busy.value = true
  step.value = 'creating'
  try {
    const { generateSecretKey, getPublicKey } = await import('nostr-tools/pure')
    const secret = generateSecretKey()
    await registerManaged(secret, getPublicKey(secret))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not create the account.'
    step.value = 'password'
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
}

function reviewInterview() {
  parsed.value = {
    bio: answers.work,
    can_offer: answers.offer ? [answers.offer] : [],
    looking_for: answers.need ? [answers.need] : [],
  }
  error.value = ''
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
    await openFeed()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not follow those accounts.'
  } finally {
    busy.value = false
  }
}
</script>
