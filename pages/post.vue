<template>
  <NetworkAppShell>
    <form class="px-4 py-6" @submit.prevent="publish">
      <h1 class="text-xl font-semibold">Post</h1>
      <textarea v-model="content" rows="6" class="mt-4 w-full rounded-ui border border-neutral-300 px-3 py-2 text-[15px] outline-none focus:border-brand-blue" placeholder="What is happening?" />
      <div class="mt-3 flex items-center justify-between">
        <nuxt-link to="/write" class="text-sm text-brand-blue">Write an article instead</nuxt-link>
        <UiButton type="submit" :disabled="!content.trim()" :loading="pending">Post</UiButton>
      </div>
      <p v-if="message" class="mt-3 text-sm">{{ message }}</p>
    </form>
  </NetworkAppShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Post', path: '/post', noindex: true })

const content = ref('')
const pending = ref(false)
const message = ref('')
const { signAndPublish } = useNostr()

async function publish() {
  pending.value = true
  message.value = ''
  try {
    await signAndPublish({ kind: 1, content: content.value.trim(), tags: [] })
    content.value = ''
    message.value = 'Posted.'
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'The post did not publish.'
  } finally {
    pending.value = false
  }
}
</script>
