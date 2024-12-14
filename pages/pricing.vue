<template>
    <div class="min-h-screenpy-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl mt-20 font-bold text-black-900 sm:text-4xl lg:text-5xl">Simple, transparent pricing</h2>
          <p class="mt-4 text-xl text-black-600">Choose the plan that works best for you</p>
        </div>

        <div class="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <!-- Free Plan -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="px-6 py-8">
              <h3 class="text-2xl font-bold text-black-900">Free Plan</h3>
              <p class="mt-4 text-black-600">Perfect for everyone</p>
              <p class="mt-8">
                <h1 class="text-green-500 md:text-3xl">Free Forever</h1>
              </p>
              <ul class="mt-8 space-y-4">
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="ml-3 text-black-600">Unlimited invoices</span>
                </li>
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="ml-3 text-black-600">Unlimited payments</span>
                </li>
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="ml-3 text-black-600">Basic invoice customization</span>
                </li>
              </ul>
              <button class="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">Get Started</button>
            </div>
          </div>

          <!-- Pro Plan (Coming Soon) -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden opacity-75">
            <div class="px-6 py-8">
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-black-900">Pro Plan</h3>
                <span class="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full">Coming Soon</span>
              </div>
              <p class="mt-8">
                <span class="text-4xl font-bold text-black-900">TBA</span>
              </p>
              <ul class="mt-8 space-y-4">
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="ml-3 text-black-600">Everything in Free plan</span>
                </li>
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="ml-3 text-black-600">Custom logo on invoices</span>
                </li>
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="ml-3 text-black-600">SMS notifications</span>
                </li>
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="ml-3 text-black-600">Multiple currencies support</span>
                </li>
              </ul>
              <button disabled class="mt-8 w-full bg-black-300 text-white py-2 px-4 rounded-md cursor-not-allowed">Coming Soon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>