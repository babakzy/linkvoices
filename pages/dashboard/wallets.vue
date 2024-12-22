<template>
  <div class=" bg-spring-wood-100 p-4 ">
    <h2 class="text-2xl text-cerulean-blue-900">Dashboard</h2>
  </div>
  <div class="flex flex-col md:flex-row">
    <DashboardSideBar />
    <main class="flex-1 p-6">
      <h1 class="text-3xl font-semibold mb-6">My Wallets</h1>
      <UserWallets />
    </main>
  </div>
</template>

<script lang="js" setup>

</script>

<style></style>