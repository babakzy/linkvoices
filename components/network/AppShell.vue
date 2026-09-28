<template>
  <div class="min-h-screen bg-white text-ink">
    <div class="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[272px_minmax(0,1fr)] xl:grid-cols-[272px_minmax(0,680px)_300px]">
      <aside class="hidden border-r border-neutral-200 bg-white md:flex md:flex-col md:py-4">
        <nuxt-link to="/" class="px-4 py-2">
          <img class="w-40" src="@/assets/images/mainlogo.svg" alt="Linkvoices">
        </nuxt-link>
        <NetworkIdentityColumn variant="sidebar" class="mt-3 border-y border-neutral-200" />
        <nav class="mt-4 flex flex-col gap-1 px-3">
          <nuxt-link v-for="item in items" :key="item.to" :to="item.to" class="rounded-ui px-3 py-2 text-sm font-medium hover:bg-neutral-100" :class="isActive(item.to) ? 'bg-neutral-100' : ''">
            {{ item.label }}
          </nuxt-link>
        </nav>
        <div v-if="account" class="mt-auto px-4 pb-2">
          <button class="text-sm text-neutral-600 hover:text-ink" type="button" @click="networkLogout()">Sign out</button>
        </div>
      </aside>

      <main class="min-h-screen border-neutral-200 bg-white xl:border-r">
        <header class="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 md:hidden">
          <nuxt-link to="/">
            <img class="w-36" src="@/assets/images/mainlogo.svg" alt="Linkvoices">
          </nuxt-link>
          <nuxt-link to="/profile" class="font-mono text-xs uppercase tracking-[0.06em]">Profile</nuxt-link>
        </header>
        <slot />
      </main>

      <aside class="hidden bg-white px-4 py-4 xl:block">
        <slot name="rail" />
      </aside>
    </div>
    <nav class="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-neutral-200 bg-white md:hidden">
      <nuxt-link v-for="item in mobileItems" :key="item.to" :to="item.to" class="px-1 py-3 text-center text-xs" :class="isActive(item.to) ? 'font-semibold text-ink' : 'text-neutral-500'">
        {{ item.label }}
      </nuxt-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const account = useNetworkAccount()
const items = [
  { label: 'Home', to: '/home' },
  { label: 'Discover', to: '/discover' },
  { label: 'Search', to: '/search' },
  { label: 'Post', to: '/post' },
  { label: 'Messages', to: '/messages' },
  { label: 'Notifications', to: '/notifications' },
  { label: 'Profile', to: '/profile' },
  { label: 'Settings', to: '/settings' },
]
const mobileItems = [
  { label: 'Home', to: '/home' },
  { label: 'Discover', to: '/discover' },
  { label: 'Post', to: '/post' },
  { label: 'Messages', to: '/messages' },
  { label: 'Alerts', to: '/notifications' },
]

function isActive(path: string) {
  return route.path === path
}
</script>
