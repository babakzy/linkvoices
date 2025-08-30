<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <DashboardSideBar />
      <main class="flex-1 p-8">
        <div class="max-w-6xl">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Your Invoices</h1>
              <p class="text-gray-600 mt-1">Track and manage your cryptocurrency invoices</p>
            </div>
            <NuxtLink 
              to="/dashboard/createInvoice" 
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
              <span class="material-symbols-outlined mr-2 text-sm">add</span>
              New Invoice
            </NuxtLink>
          </div>

          <!-- Invoices List -->
          <InvoicesList />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="js" setup>

</script>

<style></style>