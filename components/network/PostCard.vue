<template>
  <article class="border-b border-neutral-200 bg-white px-4 py-3">
    <div class="flex gap-3">
      <nuxt-link :to="profileLink" class="shrink-0">
        <img v-if="picture && !pictureFailed" :src="picture" alt="" class="size-10 rounded-ui border border-neutral-200 object-cover" @error="pictureFailed = true">
        <span v-else class="flex size-10 items-center justify-center rounded-ui border border-neutral-200 bg-spring-wood-100 font-mono text-xs">{{ initial }}</span>
      </nuxt-link>
      <div class="min-w-0 flex-1">
        <div class="flex items-baseline gap-2">
          <nuxt-link :to="profileLink" class="truncate text-sm font-semibold hover:underline">{{ name }}</nuxt-link>
          <span v-if="showHandle" class="truncate font-mono text-xs text-neutral-500">{{ handle }}</span>
          <span class="ml-auto shrink-0 font-mono text-xs text-neutral-500">{{ when }}</span>
        </div>
        <UiBadge v-if="member" class="mt-1" variant="neutral">Member</UiBadge>
        <div v-if="warning && !revealed" class="mt-2">
          <button class="text-sm text-neutral-600 underline" type="button" @click="revealed = true">Content warning: {{ warning }}. Show post</button>
        </div>
        <p
          v-else
          ref="body"
          class="mt-1 break-words text-[15px] leading-relaxed"
          :class="open ? 'whitespace-pre-wrap' : 'line-clamp-6'"
          v-html="html"
        />
        <button
          v-if="overflow || open"
          class="mt-1 text-sm text-neutral-500 hover:text-ink"
          type="button"
          @click="open = !open"
        >
          {{ open ? 'Show less' : 'Show more' }}
        </button>
        <div v-if="articleTitle" class="mt-3 border border-neutral-200 p-3">
          <p class="text-base font-semibold">{{ articleTitle }}</p>
          <p v-if="articleSummary" class="mt-1 text-sm text-neutral-600">{{ articleSummary }}</p>
        </div>
        <div class="mt-2 flex max-w-md items-center justify-between gap-1 text-neutral-500">
          <button class="inline-flex min-w-0 items-center gap-1.5 rounded-ui px-2 py-1 text-sm hover:bg-neutral-100 hover:text-ink" type="button" @click="replyOpen = !replyOpen">
            <span>Reply</span>
            <span class="font-mono text-xs tabular-nums text-neutral-400">{{ countLabel(engagement.replies) }}</span>
          </button>
          <button class="inline-flex min-w-0 items-center gap-1.5 rounded-ui px-2 py-1 text-sm hover:bg-neutral-100 hover:text-ink" type="button" @click="repost">
            <span>Repost</span>
            <span class="font-mono text-xs tabular-nums text-neutral-400">{{ countLabel(engagement.reposts) }}</span>
          </button>
          <button class="inline-flex min-w-0 items-center gap-1.5 rounded-ui px-2 py-1 text-sm hover:bg-neutral-100 hover:text-ink" type="button" @click="react">
            <span>Like</span>
            <span class="font-mono text-xs tabular-nums text-neutral-400">{{ countLabel(engagement.likes) }}</span>
          </button>
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
import { emptyEngagement, type NoteEngagement } from '~/utils/network/engagement'
import { formatCount, formatTime, linkifyNote, shortNpub } from '~/utils/network/format'

const props = defineProps<{
  event: NostrEvent
  name?: string
  picture?: string
  npub?: string
  member?: boolean
  owned?: boolean
  stats?: NoteEngagement
}>()

const emit = defineEmits<{
  mute: [pubkey: string]
  published: []
}>()

const { signAndPublish } = useNostr()
const revealed = ref(false)
const open = ref(false)
const overflow = ref(false)
const body = ref<HTMLElement | null>(null)
const replyOpen = ref(false)
const reply = ref('')
const replying = ref(false)
const actionError = ref('')
const muted = ref(false)
const pictureFailed = ref(false)
const engagement = ref<NoteEngagement>(emptyEngagement())

function countLabel(value: number) {
  return formatCount(value)
}

watch(() => props.stats, (stats) => {
  engagement.value = stats ? { ...stats } : emptyEngagement()
}, { immediate: true, deep: true })

const warning = computed(() => props.event.tags.find(tag => tag[0] === 'content-warning')?.[1] || '')
const html = computed(() => linkifyNote(props.event.content))
const when = computed(() => formatTime(props.event.created_at))
const handle = computed(() => props.npub ? shortNpub(props.npub) : '')
const name = computed(() => {
  const value = props.name?.trim() || ''
  if (value && !/^nostr profile$/i.test(value)) return value
  return handle.value || 'Someone'
})
const showHandle = computed(() => Boolean(handle.value) && handle.value !== name.value)
const initial = computed(() => name.value.slice(0, 1).toUpperCase())
const profileLink = computed(() => props.npub ? `/u/${props.npub}` : '/home')
const articleTitle = computed(() => props.event.kind === 30023 ? props.event.tags.find(tag => tag[0] === 'title')?.[1] : '')
const articleSummary = computed(() => props.event.kind === 30023 ? props.event.tags.find(tag => tag[0] === 'summary')?.[1] : '')

async function measure() {
  await nextTick()
  const el = body.value
  if (!el || open.value) return
  overflow.value = el.scrollHeight > el.clientHeight + 1
}

watch(() => [props.event.id, revealed.value], measure)
onMounted(measure)

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
  }).then(() => {
    engagement.value = { ...engagement.value, reposts: engagement.value.reposts + 1 }
  }))
}

function react() {
  return run(() => signAndPublish({
    kind: 7,
    content: '+',
    tags: [['e', props.event.id], ['p', props.event.pubkey]],
  }).then(() => {
    engagement.value = { ...engagement.value, likes: engagement.value.likes + 1 }
  }))
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
    engagement.value = { ...engagement.value, replies: engagement.value.replies + 1 }
  }))
  replying.value = false
}
</script>
