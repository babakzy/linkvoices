<template>
  <section class="bg-white px-4 py-16 md:container md:mx-auto md:px-6 md:py-24">
    <div class="flex flex-wrap justify-center">

      <div class="mb-10 basis-full md:basis-5/6">
        <h2 class="mb-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink md:text-5xl">
          What Is Cryptocurrency Invoicing?
        </h2>
        <p class="max-w-3xl text-lg leading-relaxed text-neutral-700">
          You send an invoice, your client pays in crypto, the money goes to your wallet. No bank in the middle,
          no platform taking a cut. Linkvoices is a free tool for that — Bitcoin, Ethereum, USDT, and DAI.
        </p>
      </div>

      <div class="mb-10 grid basis-full grid-cols-1 gap-4 md:basis-5/6 md:grid-cols-2">

        <div class="rounded-ui border border-black bg-spring-wood-100 p-6">
          <h3 class="mb-3 text-lg font-semibold text-ink">
            Why bother with crypto invoices?
          </h3>
          <p class="leading-relaxed text-neutral-700">
            PayPal and Stripe charge 3–5% and can freeze your account overnight. On-chain payments cost a few dollars
            in network fees and settle in minutes, whether your client is local or abroad.
            If you need <NuxtLink to="/censorship-resistant-payments" class="font-medium text-brand-blue underline-offset-4 hover:underline">payments no one can block</NuxtLink>,
            this is the straightforward route.
          </p>
        </div>

        <div class="rounded-ui border border-black bg-spring-wood-100 p-6">
          <h3 class="mb-3 text-lg font-semibold text-ink">
            Payments that work anywhere
          </h3>
          <p class="leading-relaxed text-neutral-700">
            Same process for a client in your city or on another continent — no wire forms, no conversion markups.
            <NuxtLink to="/send-crypto-invoices-international-clients" class="font-medium text-brand-blue underline-offset-4 hover:underline">Invoicing international clients</NuxtLink>
            is just sending them a link.
          </p>
        </div>

      </div>

      <div class="basis-full border-t border-black pt-6 md:basis-5/6">
        <p class="max-w-2xl text-base leading-relaxed text-neutral-700">
          <NuxtLink to="/login" class="font-medium text-brand-blue underline-offset-4 hover:underline">Create a free account</NuxtLink>,
          add your wallet, send your first invoice. More in the <NuxtLink to="/faq" class="font-medium text-brand-blue underline-offset-4 hover:underline">FAQ</NuxtLink>.
        </p>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>
