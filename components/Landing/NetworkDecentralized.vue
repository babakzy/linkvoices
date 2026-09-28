<template>
  <section id="network-page-wrap" class="min-h-screen border-b border-black bg-brand-blue py-16 text-white md:min-h-[80vh] md:py-32">
    <div id="network-text-wrap" class="mx-auto flex flex-wrap items-center justify-around px-4 md:container md:px-6">
      <div class="relative basis-full ">
        <div class="text-center">
          <h2 class="text-3xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-5xl">
            The network does not belong to one company
          </h2>
          <p class="mx-auto mt-6 max-w-3xl px-4 text-base leading-relaxed text-white/85 md:text-lg">
            A decentralized social network has no company in the middle. This app is one way into
            <a
              href="https://nostr.com"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-white underline decoration-white/70 underline-offset-2 hover:decoration-white"
            >Nostr</a>.
            Your profile and the people you follow stay if it fades.
          </p>
          <div class="relative mt-16">
            <div id="network-bank-icon" class="absolute left-0 right-0 top-[50%] z-10 m-auto mt-[-30px] inline-block w-[120px] rounded-full bg-brand-blue p-5 md:top-[-60px] md:mt-0">
              <img class="w-full" src="@/assets/images/Bank-icon.svg" alt="">
            </div>
            <img class="relative z-0 hidden w-full md:block" src="@/assets/images/hero-people.svg" alt="People connected without a company in the middle">
            <img class="relative z-0 w-full p-4 md:hidden" src="@/assets/images/mobile-people.svg" alt="People connected on a phone">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.registerPlugin(ScrollTrigger)
  gsap.timeline({
    scrollTrigger: {
      trigger: '#network-page-wrap',
      pin: true,
      start: 'top top',
      end: '+=430',
      scrub: true,
    },
  }).to('#network-bank-icon', { duration: 0.5, opacity: 0, y: -20 })
})
</script>
