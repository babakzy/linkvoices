<template>
  <section class="border-b border-black bg-spring-wood-100 py-16 md:py-24">
    <div class="px-4 md:container md:mx-auto md:px-6">
      <div class="mb-12 md:mb-16">
        <div class="mb-6 flex">
          <img
            src="@/assets/images/Fa7SolidFistRaised.svg"
            alt=""
            class="h-14 w-14 rounded-ui border border-black bg-white p-3 md:h-16 md:w-16"
          >
        </div>
        <h2 class="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink md:text-5xl">
          Out of the System. On Your Terms.
        </h2>
        <p class="mt-5 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
          Five guides on getting paid, staying private, and building outside institutional control.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="page in landingPages"
          :key="page.path"
          :to="page.path"
          class="group flex flex-col rounded-ui border border-black bg-white p-5 transition-colors duration-150 hover:bg-brand-blue md:p-6"
        >
          <h3 class="mb-2 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-white">
            {{ page.title }}
          </h3>
          <p class="flex-1 text-sm leading-relaxed text-neutral-700 transition-colors group-hover:text-white/85">
            {{ page.description }}
          </p>
          <span class="mt-5 inline-block border-t border-black pt-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink transition-colors group-hover:border-white group-hover:text-white">
            Read guide →
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const landingPages = [
  {
    path: '/censorship-resistant-payments',
    title: 'Censorship-Resistant Payments',
    description: 'No PayPal freezes. No Stripe bans. Get paid directly to your wallet with no middleman to cut you off.',
  },
  {
    path: '/send-crypto-invoices-international-clients',
    title: 'International Invoicing',
    description: 'Invoice clients anywhere. No banks, no borders — payments land in your wallet in minutes.',
  },
  {
    path: '/crypto-anarchism',
    title: 'Crypto Anarchism',
    description: 'Cryptography for privacy, anonymous communication, and freedom from centralized control.',
  },
  {
    path: '/decentralized-government',
    title: 'Decentralized Government',
    description: 'How authority shifts from central bodies toward local communities and the people they serve.',
  },
  {
    path: '/digital-freedom-rights-online',
    title: 'Digital Freedom',
    description: 'Online privacy, expression, and access to digital infrastructure — and why they matter for getting paid.',
  },
]
</script>

<style lang="scss" scoped></style>
