<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <DashboardSideBar />
      <main class="flex-1 p-8">
        <div class="max-w-4xl">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900">My Wallets</h1>
            <p class="text-gray-600 mt-1">Manage your cryptocurrency wallet addresses for receiving payments</p>
          </div>

          <!-- Wallets Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-6">
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