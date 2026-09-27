<template>
  <div class="mx-auto w-full max-w-xl border border-black bg-white text-left">
    <div class="flex items-center justify-between border-b border-black px-4 py-3">
      <p class="font-mono text-xs uppercase tracking-[0.06em] text-ink">Ask, then meet someone</p>
      <p class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">
        {{ peopleVisible ? '2 nearby' : 'Nearby' }}
      </p>
    </div>

    <div
      ref="threadEl"
      class="flex max-h-[34rem] min-h-[24rem] flex-col gap-4 overflow-y-auto px-4 py-5 md:min-h-[28rem]"
      aria-live="polite"
    >
      <template v-for="message in messages" :key="message.id">
        <p
          v-if="message.role === 'user'"
          class="ml-auto max-w-[85%] rounded-ui bg-ink px-3 py-2 text-sm leading-relaxed text-white"
        >
          {{ message.text }}
        </p>

        <p
          v-else-if="message.role === 'assistant'"
          class="max-w-[34rem] text-sm leading-relaxed text-ink"
        >
          {{ message.text }}
        </p>

        <p
          v-else-if="message.role === 'status'"
          class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500"
        >
          {{ message.text }}
        </p>

        <div v-else-if="message.role === 'people'" class="grid gap-px border border-black bg-black">
          <article
            v-for="person in message.people"
            :key="person.name"
            class="flex gap-3 bg-white p-4"
          >
            <span
              class="flex size-11 shrink-0 items-center justify-center bg-ink font-mono text-xs uppercase tracking-[0.06em] text-white"
              aria-hidden="true"
            >
              {{ person.initials }}
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 class="text-base font-semibold leading-tight">
                  {{ person.name }}
                  <span class="font-normal text-neutral-600"> — {{ person.role }}</span>
                </h3>
                <p class="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-neutral-500">
                  {{ person.distance }}
                </p>
              </div>
              <p class="mt-2 text-sm leading-relaxed text-neutral-700">{{ person.about }}</p>
              <p class="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-neutral-500">
                {{ person.why }}
              </p>
              <UiButton class="mt-3" size="sm" variant="secondary" to="/start">Message</UiButton>
            </div>
          </article>
        </div>
      </template>
    </div>

    <form class="border-t border-black p-3" @submit.prevent="ask">
      <div class="flex flex-wrap gap-2 pb-3">
        <button
          v-for="prompt in prompts"
          :key="prompt"
          type="button"
          class="rounded-ui border border-black bg-white px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink transition-colors hover:bg-ink hover:text-white"
          :disabled="busy"
          @click="askWith(prompt)"
        >
          {{ prompt }}
        </button>
      </div>
      <label class="sr-only" :for="inputId">Ask about finding people</label>
      <div class="flex gap-2">
        <input
          :id="inputId"
          v-model="draft"
          type="text"
          name="ask"
          autocomplete="off"
          :disabled="busy"
          placeholder="Ask about outbound marketing"
          class="h-9 min-w-0 flex-1 rounded-ui border border-neutral-400 bg-white px-3 text-sm text-ink placeholder:text-neutral-500 focus:border-brand-blue focus:outline-2 focus:outline-brand-blue/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
        <UiButton type="submit" size="md" :disabled="busy || !draft.trim()">Ask</UiButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
type PersonIntro = {
  name: string
  role: string
  initials: string
  distance: string
  about: string
  why: string
}

type ChatMessage =
  | { id: number, role: 'user', text: string }
  | { id: number, role: 'assistant', text: string }
  | { id: number, role: 'status', text: string }
  | { id: number, role: 'people', people: PersonIntro[] }

const DEFAULT_QUESTION = 'How do I get better at outbound marketing?'

const people: PersonIntro[] = [
  {
    name: 'Max Novel',
    role: 'Sales & Marketing',
    initials: 'MN',
    distance: '3 km away',
    about: 'Built outbound at two B2B companies, from the first list to the first forty customers. Talks in specifics, not playbooks.',
    why: 'Why this person? Same city. Has already done the work.',
  },
  {
    name: 'Anya Kovacs',
    role: 'Outbound & Partnerships',
    initials: 'AK',
    distance: '6 km away',
    about: 'Ran outreach for a 20-person agency. Knows which sequences waste a week and which ones book meetings.',
    why: 'Why this person? Nearby. Open to a short call this week.',
  },
]

const prompts = ['outbound marketing', 'hiring SDRs', 'cold email']

const inputId = useId()
const threadEl = ref<HTMLElement | null>(null)
const draft = ref('')
const busy = ref(false)
const nextId = ref(1)
const timers = ref<number[]>([])
const messages = ref<ChatMessage[]>(buildConversation(DEFAULT_QUESTION))

const peopleVisible = computed(() => messages.value.some(message => message.role === 'people'))

function nextMessageId(): number {
  const id = nextId.value
  nextId.value += 1
  return id
}

function topicFrom(question: string): string {
  const cleaned = question.trim().replace(/[?!.]+$/g, '')
  const lower = cleaned.toLowerCase()
  if (lower.includes('outbound')) return 'outbound marketing'
  if (lower.includes('cold email') || lower.includes('cold outreach')) return 'cold email'
  if (lower.includes('sdr')) return 'hiring SDRs'
  if (lower.includes('marketing')) return 'marketing'
  const stripped = cleaned.replace(/^(how do i|how to|i need|help with|find|looking for)\s+/i, '')
  return stripped || 'this'
}

function shortAnswer(topic: string): string {
  const lower = topic.toLowerCase()
  if (lower.includes('outbound') || lower.includes('sdr') || lower.includes('cold')) {
    return 'A tight list and a first line that proves you looked will beat a thousand generic emails.'
  }
  return 'A short answer helps. Someone who has already faced the problem helps more.'
}

function buildConversation(question: string): ChatMessage[] {
  const topic = topicFrom(question)
  nextId.value = 1
  return [
    { id: nextMessageId(), role: 'user', text: question },
    { id: nextMessageId(), role: 'assistant', text: shortAnswer(topic) },
    { id: nextMessageId(), role: 'assistant', text: `I found two people in your area that are experienced in ${topic}.` },
    { id: nextMessageId(), role: 'people', people },
  ]
}

function clearTimers() {
  for (const timer of timers.value) window.clearTimeout(timer)
  timers.value = []
}

function later(fn: () => void, ms: number) {
  timers.value.push(window.setTimeout(fn, ms))
}

function scrollThread() {
  const el = threadEl.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

function askWith(prompt: string) {
  draft.value = prompt === 'outbound marketing' ? DEFAULT_QUESTION : `How do I get better at ${prompt}?`
  void ask()
}

async function ask() {
  const question = draft.value.trim()
  if (!question || busy.value) return

  clearTimers()
  draft.value = ''
  busy.value = true
  messages.value = [{ id: nextMessageId(), role: 'user', text: question }]
  await nextTick()
  scrollThread()

  const topic = topicFrom(question)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const pause = reduced ? 0 : 1

  later(() => {
    messages.value.push({ id: nextMessageId(), role: 'status', text: 'Looking nearby…' })
    void nextTick().then(scrollThread)
  }, 280 * pause)

  later(() => {
    messages.value = messages.value.filter(message => message.role !== 'status')
    messages.value.push({ id: nextMessageId(), role: 'assistant', text: shortAnswer(topic) })
    void nextTick().then(scrollThread)
  }, 900 * pause)

  later(() => {
    messages.value.push({
      id: nextMessageId(),
      role: 'assistant',
      text: `I found two people in your area that are experienced in ${topic}.`,
    })
    void nextTick().then(scrollThread)
  }, 1500 * pause)

  later(() => {
    messages.value.push({ id: nextMessageId(), role: 'people', people })
    busy.value = false
    void nextTick().then(scrollThread)
  }, 1900 * pause)
}

onUnmounted(() => {
  clearTimers()
})
</script>
