<template>
    <div class="bg-gradient-to-b px-4 text-center from-slate-200 to-slate-50 pt-[calc(50vh-300px)] md:pt-[calc(50vh-200px)] min-h-[90vh]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
        <h1 class="text-4xl md:text-5xl text-slate-900">Email confirmed</h1>
        <p class="text-lg text-slate-800 mt-4">Your email has been confirmed. Please log in to continue.</p>
        <NuxtLink to="/login" class="btn mt-4 btn-primary">Log in</NuxtLink>
    </div>
</template>

<script setup>
usePageSeo({
  title: 'Email Confirmation',
  description: 'Your Linkvoices account email has been confirmed. Log in to start creating and sending cryptocurrency invoices.',
  path: '/confirm',
  noindex: true,
})
</script>

<style lang="scss" scoped></style>
