<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <DashboardSideBar />
      <main class="flex-1 p-6 md:p-8">
        <div class="max-w-5xl mx-auto">
          <!-- Header -->
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-1">Wallets</h1>
            <p class="text-gray-600">Manage your cryptocurrency wallet addresses</p>
          </div>

          <!-- Wallets Card -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <UserWallets />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="js" setup>

</script>

<style></style>