<template>
  <section class="bg-white py-16 md:py-24">
    <div class="md:container md:mx-auto px-4">
      <div class="text-center mb-12 md:mb-16">
        <div class="flex justify-center mb-5">
          <img
            src="@/assets/images/Fa7SolidFistRaised.svg"
            alt=""
            class="w-14 h-14 md:w-16 md:h-16"
          >
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-cerulean-blue-900 capitalize">
          Out of the System. On Your Terms.
        </h2>
        <p class="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
          Four guides on getting paid, staying private, and building outside institutional control.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <NuxtLink
          v-for="page in landingPages"
          :key="page.path"
          :to="page.path"
          class="group flex flex-col bg-spring-wood-50 border border-spring-wood-200 rounded-xl p-5 md:p-6 transition-all duration-200 hover:border-cerulean-blue-300 hover:shadow-md"
        >
          <h3 class="text-lg font-semibold text-cerulean-blue-900 mb-2 group-hover:text-cerulean-blue-600 transition-colors leading-snug">
            {{ page.title }}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed flex-1">
            {{ page.description }}
          </p>
          <span class="inline-block mt-4 text-cerulean-blue-600 font-medium text-sm group-hover:text-cerulean-blue-700">
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
]
</script>

<style lang="scss" scoped></style>
