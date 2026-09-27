<template>
  <article class="border-b border-neutral-200 bg-white px-4 py-3">
    <div class="flex gap-3">
      <nuxt-link :to="profileLink" class="shrink-0">
        <img v-if="picture" :src="picture" alt="" class="size-10 rounded-ui border border-neutral-200 object-cover">
        <span v-else class="flex size-10 items-center justify-center rounded-ui border border-neutral-200 bg-spring-wood-100 font-mono text-xs">{{ initial }}</span>
      </nuxt-link>
      <div class="min-w-0 flex-1">
        <div class="flex items-baseline gap-2">
          <nuxt-link :to="profileLink" class="truncate text-sm font-semibold hover:underline">{{ name }}</nuxt-link>
          <span class="truncate font-mono text-xs text-neutral-500">{{ handle }}</span>
          <span class="ml-auto shrink-0 font-mono text-xs text-neutral-500">{{ when }}</span>
        </div>
        <UiBadge v-if="member" class="mt-1" variant="neutral">Member</UiBadge>
        <div v-if="warning && !revealed" class="mt-2">
          <button class="text-sm text-neutral-600 underline" type="button" @click="revealed = true">Content warning: {{ warning }}. Show post</button>
        </div>
        <p v-else class="mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed" v-html="html" />
        <div v-if="articleTitle" class="mt-3 border border-neutral-200 p-3">
          <p class="text-base font-semibold">{{ articleTitle }}</p>
          <p v-if="articleSummary" class="mt-1 text-sm text-neutral-600">{{ articleSummary }}</p>
        </div>
        <div class="mt-2 flex max-w-md items-center justify-between text-neutral-500">
          <button class="rounded-ui px-2 py-1 text-sm hover:bg-neutral-100 hover:text-ink" type="button" @click="replyOpen = !replyOpen">Reply</button>
          <button class="rounded-ui px-2 py-1 text-sm hover:bg-neutral-100 hover:text-ink" type="button" @click="repost">Repost</button>
          <button class="rounded-ui px-2 py-1 text-sm hover:bg-neutral-100 hover:text-ink" type="button" @click="react">Like</button>
          <button v-if="owned" class="rounded-ui px-2 py-1 text-sm hover:bg-neutral-100 hover:text-red-700" type="button" @click="remove">Delete</button>
          <button v-else class="rounded-ui px-2 py-1 text-sm hover:bg-neutral-100 hover:text-ink" type="button" @click="muted = true; emit('mute', event.pubkey)">Mute</button>
        </div>
        <p v-if="actionError" class="mt-2 text-sm text-red-700">{{ actionError }}</p>
        <form v-if="replyOpen" class="mt-3" @submit.prevent="sendReply">
          <textarea v-model="reply" rows="3" class="w-full rounded-ui border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-blue" placeholder="Post your reply" />
          <UiButton class="mt-2" type="submit" :loading="replying" :disabled="!reply.trim()">Reply</UiButton>
        </form>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { NostrEvent } from '~/composables/useNostr'
import { formatTime, linkifyNote, shortNpub } from '~/utils/network/format'

const props = defineProps<{
  event: NostrEvent
  name?: string
  picture?: string
  npub?: string
  member?: boolean
  owned?: boolean
}>()

const emit = defineEmits<{
  mute: [pubkey: string]
  published: []
}>()

const { signAndPublish } = useNostr()
const revealed = ref(false)
const replyOpen = ref(false)
const reply = ref('')
const replying = ref(false)
const actionError = ref('')
const muted = ref(false)

const warning = computed(() => props.event.tags.find(tag => tag[0] === 'content-warning')?.[1] || '')
const html = computed(() => linkifyNote(props.event.content))
const when = computed(() => formatTime(props.event.created_at))
const handle = computed(() => props.npub ? shortNpub(props.npub) : shortNpub(props.event.pubkey))
const name = computed(() => props.name || 'Nostr profile')
const initial = computed(() => name.value.slice(0, 1).toUpperCase())
const profileLink = computed(() => props.npub ? `/u/${props.npub}` : '/home')
const articleTitle = computed(() => props.event.kind === 30023 ? props.event.tags.find(tag => tag[0] === 'title')?.[1] : '')
const articleSummary = computed(() => props.event.kind === 30023 ? props.event.tags.find(tag => tag[0] === 'summary')?.[1] : '')

async function run(action: () => Promise<void>) {
  actionError.value = ''
  try {
    await action()
    emit('published')
  } catch (error) {
    actionError.value = error instanceof Error ? error.message : 'That did not publish.'
  }
}

function repost() {
  return run(() => signAndPublish({
    kind: 6,
    content: JSON.stringify(props.event),
    tags: [['e', props.event.id], ['p', props.event.pubkey]],
  }).then(() => undefined))
}

function react() {
  return run(() => signAndPublish({
    kind: 7,
    content: '+',
    tags: [['e', props.event.id], ['p', props.event.pubkey]],
  }).then(() => undefined))
}

function remove() {
  return run(() => signAndPublish({
    kind: 5,
    content: 'Deleted',
    tags: [['e', props.event.id]],
  }).then(() => undefined))
}

async function sendReply() {
  replying.value = true
  await run(() => signAndPublish({
    kind: 1,
    content: reply.value.trim(),
    tags: [['e', props.event.id, '', 'reply'], ['p', props.event.pubkey]],
  }).then(() => {
    reply.value = ''
    replyOpen.value = false
  }))
  replying.value = false
}
</script>
