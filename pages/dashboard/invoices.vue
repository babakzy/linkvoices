<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <DashboardSideBar />
      <main class="flex-1 p-6 md:p-8">
        <div class="max-w-7xl mx-auto">
          <!-- Header -->
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 mb-1">Invoices</h1>
              <p class="text-gray-600">Track and manage your cryptocurrency invoices</p>
            </div>
            <NuxtLink 
              to="/dashboard/createInvoice" 
              class="inline-flex items-center px-4 py-2 bg-cerulean-blue-600 text-white font-medium rounded-lg hover:bg-cerulean-blue-700 transition-colors duration-200">
              <span class="material-symbols-outlined mr-2 text-lg">add</span>
              New Invoice
            </NuxtLink>
          </div>

          <!-- Invoices List -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <InvoicesList />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="js" setup>

</script>

<style></style>