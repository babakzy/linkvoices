<template>
  <NetworkAppShell>
    <div class="border-b border-neutral-200 px-4 py-4">
      <h1 class="text-xl font-semibold">Messages</h1>
      <p class="mt-2 text-sm leading-relaxed text-neutral-600">
        Messages are encrypted before they are published. Relays can see that a wrapped message was delivered, and roughly when, but not the contents or who you are talking to.
      </p>
    </div>
    <form class="border-b border-neutral-200 px-4 py-4" @submit.prevent="send">
      <UiInput v-model="recipient" label="Their public address" placeholder="npub…" />
      <UiTextarea v-model="body" class="mt-3" label="Message" :rows="4" />
      <UiButton class="mt-3" type="submit" :loading="sending" :disabled="!recipient.trim() || !body.trim()">Send</UiButton>
      <p v-if="notice" class="mt-3 text-sm">{{ notice }}</p>
    </form>
    <div v-if="loading" class="flex justify-center py-10"><UiSpinner /></div>
    <article v-for="message in messages" :key="message.id" class="border-b border-neutral-200 px-4 py-3">
      <p class="font-mono text-xs text-neutral-500">{{ message.from }}</p>
      <p class="mt-1 text-sm">{{ message.content }}</p>
    </article>
    <p v-if="!loading && !messages.length" class="px-4 py-10 text-sm text-neutral-600">No messages yet. If someone uses an older app, they may not be able to read these.</p>
  </NetworkAppShell>
</template>

<script setup lang="ts">
import { getSecretKey } from '~/utils/network/keyStore'
import { shortNpub } from '~/utils/network/format'

definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Messages', path: '/messages', noindex: true })

const account = useNetworkAccount()
const { query, publish } = useNostr()
const recipient = ref('')
const body = ref('')
const sending = ref(false)
const loading = ref(true)
const notice = ref('')
const messages = ref<Array<{ id: string, from: string, content: string }>>([])

async function load() {
  loading.value = true
  const secret = getSecretKey()
  if (!secret || !account.value) {
    loading.value = false
    notice.value = 'Sign in again with your password to read messages. The key is kept in memory for this visit only.'
    return
  }
  try {
    const wraps = await query({ kinds: [1059], '#p': [account.value.pubkey], limit: 30 })
    const { unwrapEvent } = await import('nostr-tools/nip17')
    const nip19 = await import('nostr-tools/nip19')
    const next: typeof messages.value = []
    for (const wrap of wraps) {
      try {
        const rumor = unwrapEvent(wrap, secret)
        next.push({
          id: wrap.id,
          from: shortNpub(nip19.npubEncode(rumor.pubkey)),
          content: rumor.content,
        })
      } catch { /* not for this key */ }
    }
    messages.value = next
  } finally {
    loading.value = false
  }
}

async function send() {
  const secret = getSecretKey()
  if (!secret || !account.value) {
    notice.value = 'Sign in again with your password before sending. An extension-only account cannot seal messages in this browser yet.'
    return
  }
  sending.value = true
  notice.value = ''
  try {
    const nip19 = await import('nostr-tools/nip19')
    const decoded = nip19.decode(recipient.value.trim())
    if (decoded.type !== 'npub') throw new Error('Paste their public address, starting with npub.')
    const { wrapManyEvents } = await import('nostr-tools/nip17')
    const events = wrapManyEvents(secret, [
      { publicKey: decoded.data },
      { publicKey: account.value.pubkey },
    ], body.value.trim())
    for (const event of events) await publish(event)
    body.value = ''
    notice.value = 'Sent.'
    await load()
  } catch (error) {
    notice.value = error instanceof Error ? error.message : 'The message did not send.'
  } finally {
    sending.value = false
  }
}

onMounted(load)
</script>
