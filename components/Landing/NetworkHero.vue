<template>
  <section class="border-b border-black bg-white py-14 md:py-24">
    <div class="hero2bg flex min-h-[240px] flex-wrap items-center justify-around md:min-h-[380px]">
      <div class="relative basis-full text-center md:basis-9/12">
        <h1 class="relative z-10 inline-block text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-ink md:text-7xl">
          Let's connect people again.
        </h1>
      </div>
    </div>
    <div
      class="mx-4 my-8 flex flex-col items-center justify-center gap-2 border-y border-black py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink md:mx-auto md:max-w-4xl md:flex-row md:gap-4 md:px-0"
    >
      <span class="inline-block">Decentralized network</span>
      <span class="hidden h-4 w-px bg-black md:inline-block" />
      <span class="inline-block">Nostr</span>
      <span class="hidden h-4 w-px bg-black md:inline-block" />
      <span class="inline-block">Algorithms for you</span>
      <span class="hidden h-4 w-px bg-black md:inline-block" />
      <span class="inline-block">Real people</span>
    </div>
    <div class="basis-full text-center md:my-0">
      <nuxt-link
        class="inline-flex h-10 items-center justify-center rounded-ui border border-ink bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        to="/start"
      >
        Create Your Decentralized Social Profile
      </nuxt-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero2bg {
  background-image: url('@/assets/images/hero2bg.svg');
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
