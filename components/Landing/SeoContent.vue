<template>
  <section class="md:container md:mx-auto px-4 py-16 md:py-20">
    <div class="flex flex-wrap justify-center">

      <div class="basis-full md:basis-5/6 text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-cerulean-blue-900 mb-4">
          What Is Cryptocurrency Invoicing?
        </h2>
        <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          You send an invoice, your client pays in crypto, the money goes to your wallet. No bank in the middle,
          no platform taking a cut. Linkvoices is a free tool for that — Bitcoin, Ethereum, USDT, and DAI.
        </p>
      </div>

      <div class="basis-full md:basis-5/6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        <div class="bg-spring-wood-50 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-cerulean-blue-900 mb-2">
            Why bother with crypto invoices?
          </h3>
          <p class="text-gray-600 leading-relaxed">
            PayPal and Stripe charge 3–5% and can freeze your account overnight. On-chain payments cost a few dollars
            in network fees and settle in minutes, whether your client is local or abroad.
            If you need <NuxtLink to="/censorship-resistant-payments" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">payments no one can block</NuxtLink>,
            this is the straightforward route.
          </p>
        </div>

        <div class="bg-spring-wood-50 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-cerulean-blue-900 mb-2">
            Payments that work anywhere
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Same process for a client in your city or on another continent — no wire forms, no conversion markups.
            <NuxtLink to="/send-crypto-invoices-international-clients" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">Invoicing international clients</NuxtLink>
            is just sending them a link.
          </p>
        </div>

      </div>

      <div class="basis-full md:basis-5/6 text-center">
        <p class="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
          <NuxtLink to="/login" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">Create a free account</NuxtLink>,
          add your wallet, send your first invoice. More in the <NuxtLink to="/faq" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">FAQ</NuxtLink>.
        </p>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>
