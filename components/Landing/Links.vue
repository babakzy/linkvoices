<template>
  <section class="border-b border-black bg-white py-16 md:py-24" aria-labelledby="guides-heading">
    <div class="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
      <header>
        <h2 id="guides-heading" class="text-2xl font-semibold leading-snug tracking-[-0.02em] text-ink md:text-4xl">
          Technologies for humanity.
        </h2>
        <p class="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg">
          Digital freedom means people can get paid, stay private, and organize without a company or a bank in the middle. Decentralized networks, cryptography, and public blockchains are the tools that make that possible. These pages are a short reading list on how they work.
        </p>
      </header>

      <ul class="mt-12 md:mt-16">
        <li
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          class="grid grid-cols-1 border-t border-black"
          :class="row.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        >
          <NuxtLink
            v-for="page in row"
            :key="page.path"
            :to="page.path"
            class="group block py-6 md:py-8 md:pr-10 md:last:pr-0"
          >
            <span class="font-mono text-xs tabular-nums text-neutral-500">
              {{ page.number }}
            </span>
            <h3 class="mt-2 text-lg font-semibold leading-snug text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:text-brand-blue group-hover:decoration-brand-blue">
              {{ page.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-neutral-700">
              {{ page.description }}
            </p>
          </NuxtLink>
        </li>
      </ul>
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

const rows = computed(() => {
  const numbered = landingPages.map((page, index) => ({
    ...page,
    number: String(index + 1).padStart(2, '0'),
  }))
  const size = 3
  const result = []
  for (let i = 0; i < numbered.length; i += size) {
    result.push(numbered.slice(i, i + size))
  }
  return result
})
</script>
