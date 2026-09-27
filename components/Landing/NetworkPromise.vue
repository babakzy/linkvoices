<template>
  <UiSection tone="white">
    <h2 class="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">Create your profile once. Then go find people.</h2>
    <div class="mt-10 grid gap-px border border-black bg-black md:grid-cols-3">
      <article v-for="item in items" :key="item.title" class="bg-white p-6">
        <p class="font-mono text-xs uppercase tracking-[0.06em] text-neutral-500">{{ item.kicker }}</p>
        <h3 class="mt-3 text-2xl font-semibold">{{ item.title }}</h3>
        <p class="mt-3 text-sm leading-relaxed">{{ item.body }}</p>
      </article>
    </div>
  </UiSection>
  <UiSection tone="spring">
    <h2 class="text-3xl font-semibold md:text-4xl">Algorithms for you, not against you.</h2>
    <p class="mt-4 max-w-2xl text-base leading-relaxed">Pick how the feed and discovery work. Following, local, collaboration, new people, or something wider. The choice stays until you change it.</p>
    <UiButton class="mt-6" to="/start">Get started</UiButton>
  </UiSection>
</template>

<script setup lang="ts">
const items = [
  { kicker: '01', title: 'A real account', body: 'Created in your browser. You can take it to any other compatible app.' },
  { kicker: '02', title: 'A human profile', body: 'Skills, interests, and what you want right now. You review everything before it is saved.' },
  { kicker: '03', title: 'People, with a reason', body: 'Suggestions say why. You follow, reply, or message. The app does not introduce you in secret.' },
]
</script>
