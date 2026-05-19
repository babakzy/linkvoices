<template>
  <div
    class=" bg-gradient-to-b from-slate-200 to-slate-50 pt-[calc(50vh-300px)] md:pt-[calc(50vh-200px)] min-h-[90vh] ">
    <!-- <LoginForm/> -->
     <NewLoginForm/>
  </div>
</template>

<script setup>
usePageSeo({
  title: 'Log In or Register',
  description:
    'Log in or create a free Linkvoices account to send cryptocurrency invoices. Accept Bitcoin, Ethereum, USDT, and DAI payments directly to your wallet.',
  path: '/login',
  noindex: true,
})
</script>

<style scoped></style>