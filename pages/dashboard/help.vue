<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <DashboardSideBar />
      <main class="flex-1 p-8">
        <div class="max-w-4xl">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900">Help & Support</h1>
            <p class="text-gray-600 mt-1">Get help with setting up your crypto wallets and using Linkvoices</p>
          </div>

          <!-- Help Content -->
          <div class="bg-white border border-gray-200 rounded-xl p-8">
            <div class="space-y-8">
              <!-- Getting Started Section -->
              <div>
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span class="material-symbols-outlined text-blue-600 text-lg">wallet</span>
                  </div>
                  <h2 class="text-xl font-semibold text-gray-900">Setting up your crypto wallet</h2>
                </div>
                
                <p class="text-gray-700 mb-6">If you don't have a crypto wallet yet, follow these simple steps:</p>

                <!-- Steps -->
                <div class="space-y-6">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                      1
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900 mb-2">Install a wallet app</h3>
                      <p class="text-gray-700">Download and install a popular crypto wallet app like:</p>
                      <div class="mt-2 flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Coinbase</span>
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Trust Wallet</span>
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">MetaMask</span>
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Exodus</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                      2
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900 mb-2">Create a new wallet</h3>
                      <p class="text-gray-700">Open the app and follow the instructions to create a new wallet. Make sure to securely store your recovery phrase.</p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                      3
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900 mb-2">Copy your wallet addresses</h3>
                      <p class="text-gray-700">Find and copy the public wallet addresses for each cryptocurrency you want to use. You'll need these to receive payments.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Next Steps -->
              <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <span class="material-symbols-outlined text-green-600">check_circle</span>
                  </div>
                  <div class="ml-3">
                    <h3 class="font-medium text-green-800 mb-2">You're ready!</h3>
                    <p class="text-green-700">
                      After setting up your wallet, add your wallet addresses in the 
                      <NuxtLink to="/dashboard/wallets" class="font-medium underline">Wallets section</NuxtLink> 
                      and start creating crypto invoices for free.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Contact Support -->
              <div class="border-t border-gray-200 pt-8">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <span class="material-symbols-outlined text-gray-600 text-lg">support</span>
                  </div>
                  <h2 class="text-xl font-semibold text-gray-900">Need more help?</h2>
                </div>
                <p class="text-gray-700">
                  If you have questions or need assistance, feel free to reach out to our support team. 
                  We're here to help you get started with crypto invoicing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="js" setup>

</script>

<style></style>