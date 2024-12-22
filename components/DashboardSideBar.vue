<template>
        <aside class="w-full md:w-64 bg-gradient-to-b from-cerulean-blue-700 to bg-spring-wood-900 border-r border-scerulean-blue-600 p-5 py-8 flex flex-col">
      <ul class="flex flex-col text-spring-wood-50">
        <li class="mb-4">
          <nuxt-link to="/dashboard/wallets" class=" hover:text-white flex items-center">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z" />
            </svg>
            Wallets
          </nuxt-link>
        </li>
        <!-- <li class="mb-4">
          <nuxt-link to="/dashboard/createInvoice" class=" hover:text-white flex items-center">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z" />
            </svg>
            New Invoice
          </nuxt-link>
        </li> -->
        <li class="mb-4">
          <nuxt-link to="/dashboard/invoices" class=" hover:text-white flex items-center">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z" />
            </svg>
            Invoices
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard/help" class=" hover:text-white flex items-center">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z" />
            </svg>
            Help</nuxt-link>
        </li>
      </ul>
    </aside>

</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>