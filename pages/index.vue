<template>
  <Header></Header>

    <home-landing />
  
</template>

<script setup lang="js">
definePageMeta({
  layout: false
})
useHead({
  title: 'Linkvoices - Generate and Send direct Cryptocurrency Invoices for Free',
  meta: [
    {
      name: 'description',
      content: 'Create and send direct cryptocurrency invoices. Bitcoin, Ethereum, USDT, and DAI.'
    },
    {
      name: 'keywords',
      content: 'cryptocurrency direct invoices, crypto payment, bitcoin invoice, ethereum invoice, USDT invoice, DAI invoice, free crypto invoice generator, blockchain payments'
    },
    {
      property: 'og:title',
      content: 'Linkvoices - Generate and Send Cryptocurrency Invoices for Free'
    },
    {
      property: 'og:description', 
      content: 'Create and send direct cryptocurrency invoices. Bitcoin, Ethereum, USDT, and DAI.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:title',
      content: 'Linkvoices - Generate and Send Cryptocurrency Invoices for Free'
    },
    {
      name: 'twitter:description',
      content: 'Create and send direct cryptocurrency invoices. Bitcoin, Ethereum, USDT, and DAI.'
    }
  ]
})

</script>

<style scoped></style>