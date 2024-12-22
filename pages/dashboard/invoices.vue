<template>
  <div class=" bg-spring-wood-100 p-4 ">
    <h2 class="text-2xl text-cerulean-blue-900">Dashboard</h2>
  </div>
  <div class="flex flex-col md:flex-row">
    <DashboardSideBar />
    <main class="flex-1 p-6">
     <div class="flex items-center justify-between my-4">
      <h1 class="text-3xl font-semibold mb-6">Your Invoices</h1>
      <NuxtLink class="btn btn-primary " to="/dashboard/createInvoice">+ New Invoice</NuxtLink>
     </div> 
      <InvoicesList />
    </main>
  </div>
</template>

<script lang="js" setup>

</script>

<style></style>