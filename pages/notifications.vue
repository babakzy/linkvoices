<template>
  <NetworkAppShell>
    <div class="border-b border-neutral-200 px-4 py-4">
      <h1 class="text-xl font-semibold">Notifications</h1>
    </div>
    <div v-if="pending" class="flex justify-center py-10"><UiSpinner /></div>
    <article v-for="item in notifications" :key="item.id" class="border-b border-neutral-200 px-4 py-3">
      <p class="text-sm">{{ label(item) }}</p>
      <p class="mt-1 font-mono text-xs text-neutral-500">{{ item.type }}</p>
      <div v-if="item.type === 'connection_request'" class="mt-2 flex gap-2">
        <UiButton size="sm" @click="respond(item, true)">Accept</UiButton>
        <UiButton size="sm" variant="secondary" @click="respond(item, false)">Decline</UiButton>
      </div>
    </article>
    <p v-if="!pending && !notifications.length" class="px-4 py-10 text-sm text-neutral-600">Nothing new. Connection requests show up here.</p>
    <section class="px-4 py-6">
      <h2 class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">In the app</h2>
      <label v-for="pref in prefs" :key="pref.type" class="mt-3 flex items-center justify-between gap-3 text-sm">
        <span>{{ prefLabel(pref.type) }}</span>
        <input v-model="pref.in_app" type="checkbox" @change="save(pref)">
      </label>
    </section>
  </NetworkAppShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'network', middleware: ['network'] })
usePageSeo({ title: 'Notifications', path: '/notifications', noindex: true })

const pending = ref(true)
const notifications = ref<Array<{ id: string, type: string, payload: Record<string, string>, read_at: string | null }>>([])
const prefs = ref<Array<{ type: string, in_app: boolean }>>([])

function prefLabel(type: string) {
  const labels: Record<string, string> = {
    connection_request: 'Connection requests',
    connection_response: 'Connection replies',
    mention: 'Mentions',
    reply: 'Replies',
  }
  return labels[type] || type.replaceAll('_', ' ')
}

function label(item: { type: string, payload: Record<string, string> }) {
  if (item.type === 'connection_request') return 'Someone wants to add a connection type.'
  if (item.type === 'connection_response') return item.payload.status === 'active' ? 'A connection type was accepted.' : 'A connection type was declined.'
  return 'Something relevant happened.'
}

async function load() {
  const response = await $fetch<{ notifications: typeof notifications.value, prefs: typeof prefs.value }>('/api/network/notifications')
  notifications.value = response.notifications
  prefs.value = response.prefs
  pending.value = false
}

async function respond(item: { id: string, payload: Record<string, string> }, accept: boolean) {
  await $fetch('/api/network/connections/respond', { method: 'POST', body: { id: item.payload.connectionId, accept } })
  await $fetch('/api/network/notifications', { method: 'PUT', body: { id: item.id } })
  await load()
}

async function save(pref: { type: string, in_app: boolean }) {
  await $fetch('/api/network/notifications', { method: 'PUT', body: { prefs: [{ type: pref.type, inApp: pref.in_app }] } })
}

onMounted(load)
</script>
