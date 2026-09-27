<template>
  <NetworkAppShell>
    <div class="px-4 py-6">
      <h1 class="text-xl font-semibold">Settings</h1>
      <section class="mt-6 border border-neutral-200 p-4">
        <h2 class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">Your public address</h2>
        <p class="mt-2 break-all text-sm">{{ npub || 'Sign in to see it.' }}</p>
      </section>
      <section class="mt-4 border border-neutral-200 p-4">
        <h2 class="text-lg font-semibold">Make sure you can't lose this account</h2>
        <p class="mt-2 text-sm leading-relaxed text-neutral-600">Save your recovery key and you can get back in from any device, even if you lose this one. We can't reset it for you.</p>
        <form class="mt-4" @submit.prevent="reveal">
          <UiInput v-model="password" type="password" label="Password" autocomplete="current-password" />
          <UiButton class="mt-3" type="submit" variant="secondary" :loading="revealing">Show recovery key</UiButton>
        </form>
        <p v-if="nsec" class="mt-3 break-all border border-neutral-200 bg-spring-wood-100 p-3 font-mono text-xs">{{ nsec }}</p>
        <p v-if="revealError" class="mt-2 text-sm text-red-700">{{ revealError }}</p>
      </section>
      <section class="mt-4 border border-neutral-200 p-4">
        <h2 class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">Relays</h2>
        <p class="mt-2 text-sm text-neutral-600">Used quietly when you read and post. Change them only if you know why.</p>
        <textarea v-model="relayText" rows="5" class="mt-3 w-full rounded-ui border border-neutral-300 px-3 py-2 font-mono text-xs" />
        <UiButton class="mt-3" variant="secondary" @click="saveRelays">Save relays</UiButton>
      </section>
    </div>
  </NetworkAppShell>
</template>

<script setup lang="ts">
import { getSecretKey } from '~/utils/network/keyStore'
import { aesDecrypt, wrappingKeyFromPassword } from '~/utils/network/crypto'
import { DEFAULT_RELAYS } from '~/utils/network/constants'

definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Settings', path: '/settings', noindex: true })

const account = useNetworkAccount()
const { relays } = useNostr()
const npub = ref('')
const password = ref('')
const nsec = ref('')
const revealing = ref(false)
const revealError = ref('')
const relayText = ref(DEFAULT_RELAYS.join('\n'))

onMounted(async () => {
  if (!account.value) return
  const nip19 = await import('nostr-tools/nip19')
  npub.value = nip19.npubEncode(account.value.pubkey)
  relayText.value = relays.value.join('\n')
})

function saveRelays() {
  const next = relayText.value.split('\n').map(line => line.trim()).filter(line => line.startsWith('wss://'))
  if (next.length) relays.value = next
}

async function reveal() {
  revealing.value = true
  revealError.value = ''
  nsec.value = ''
  try {
    const secret = getSecretKey()
    const nip19 = await import('nostr-tools/nip19')
    if (secret) {
      nsec.value = nip19.nsecEncode(secret)
      return
    }
    const email = window.prompt('Email for this account')
    if (!email) throw new Error('Email is required to unlock the recovery key.')
    const start = await $fetch<{ salt: string }>('/api/network/login-start', { method: 'POST', body: { email } })
    const { verifierFromPassword } = await import('~/utils/network/crypto')
    const login = await $fetch<{ encryptedKey: { ciphertext: string, nonce: string } | null, wraps: Array<{ method: string, wrapped_dek: string, nonce: string }> }>('/api/network/login', {
      method: 'POST',
      body: { email, verifier: verifierFromPassword(password.value, start.salt) },
    })
    const wrap = login.wraps.find(item => item.method === 'password')
    if (!login.encryptedKey || !wrap) throw new Error('This account has no stored recovery key.')
    const dek = await aesDecrypt(wrappingKeyFromPassword(password.value, start.salt), {
      ciphertext: wrap.wrapped_dek,
      nonce: wrap.nonce,
    })
    const key = await aesDecrypt(dek, login.encryptedKey)
    nsec.value = nip19.nsecEncode(key)
  } catch (error) {
    revealError.value = error instanceof Error ? error.message : 'Could not reveal the recovery key.'
  } finally {
    revealing.value = false
  }
}
</script>
