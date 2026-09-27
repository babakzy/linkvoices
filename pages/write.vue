<template>
  <NetworkAppShell>
    <form class="px-4 py-6" @submit.prevent="publish">
      <h1 class="text-xl font-semibold">Article</h1>
      <p class="mt-2 text-sm text-neutral-600">Drafts stay on Linkvoices until you publish. Publishing replaces the previous version of the same article.</p>
      <div class="mt-4 grid gap-4">
        <UiInput v-model="title" label="Title" />
        <UiInput v-model="summary" label="Summary" />
        <UiInput v-model="topics" label="Topics" description="Comma separated." />
        <UiTextarea v-model="content" label="Article" :rows="14" />
      </div>
      <div class="mt-4 flex gap-2">
        <UiButton type="button" variant="secondary" :loading="saving" @click="saveDraft">Save draft</UiButton>
        <UiButton type="submit" :loading="publishing" :disabled="!title.trim() || !content.trim()">Publish</UiButton>
      </div>
      <p v-if="message" class="mt-3 text-sm">{{ message }}</p>
    </form>
  </NetworkAppShell>
</template>

<script setup lang="ts">
import { readingMinutes } from '~/utils/network/format'

definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Write', path: '/write', noindex: true })

const title = ref('')
const summary = ref('')
const topics = ref('')
const content = ref('')
const draftId = ref('')
const saving = ref(false)
const publishing = ref(false)
const message = ref('')
const { signAndPublish } = useNostr()

async function saveDraft() {
  saving.value = true
  try {
    const response = await $fetch<{ draft: { id: string } }>('/api/network/drafts', {
      method: 'POST',
      body: {
        id: draftId.value || undefined,
        title: title.value,
        summary: summary.value,
        content: content.value,
        topics: topics.value.split(',').map(item => item.trim()).filter(Boolean),
      },
    })
    draftId.value = response.draft.id
    message.value = 'Draft saved. It is not public.'
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'Could not save the draft.'
  } finally {
    saving.value = false
  }
}

async function publish() {
  publishing.value = true
  message.value = ''
  try {
    const slug = title.value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'article'
    const topicTags = topics.value.split(',').map(item => item.trim()).filter(Boolean).map(topic => ['t', topic])
    await signAndPublish({
      kind: 30023,
      content: content.value,
      tags: [
        ['d', slug],
        ['title', title.value.trim()],
        ['summary', summary.value.trim()],
        ['published_at', String(Math.floor(Date.now() / 1000))],
        ...topicTags,
      ],
    })
    message.value = `Published. About ${readingMinutes(content.value)} min to read.`
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'The article did not publish.'
  } finally {
    publishing.value = false
  }
}
</script>
