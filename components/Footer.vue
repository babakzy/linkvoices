<template>
    <footer class="border-t py-8 bg-gray-50 mt-32">
        <div class="md:container md:mx-auto">
            <div class="flex flex-wrap mx-3">
                <div class="basis-full md:basis-1/4 mb-6">
                    <div class="flex flex-col">
                        <nuxt-link to="/">
                            <img class="w-48 mb-4" src="@/assets/images/mainlogo.svg" alt="linkvoices - crypto invoices">
                        </nuxt-link>
                        <p class="text-gray-600">Decentralized invoicing powered by cryptocurrency</p>
                    </div>
                </div>
                
                <div class="basis-full md:basis-1/4 mb-6">
                    <h4 class="font-semibold text-gray-900 mb-4">Resources</h4>
                    <ul class="space-y-2">
                        <li><nuxt-link to="/help" class="text-gray-600 hover:text-gray-900">How to Use</nuxt-link></li>
                        <li><nuxt-link to="/faq" class="text-gray-600 hover:text-gray-900">FAQ</nuxt-link></li>
                        <li><nuxt-link to="/pricing" class="text-gray-600 hover:text-gray-900">Pricing</nuxt-link></li>
                    </ul>
                </div>

                <div class="basis-full md:basis-1/4 mb-6">
                    <h4 class="font-semibold text-gray-900 mb-4">Company</h4>
                    <ul class="space-y-2">
                        <li><nuxt-link to="/contact" class="text-gray-600 hover:text-gray-900">Contact</nuxt-link></li>
                    </ul>
                </div>

                <div class="basis-full md:basis-1/4 mb-6">
                    <h4 class="font-semibold text-gray-900 mb-4">Legal</h4>
                    <ul class="space-y-2">
                        <li><nuxt-link to="/privacy" class="text-gray-600 hover:text-gray-900">Privacy Policy</nuxt-link></li>
                        <li><nuxt-link to="/terms" class="text-gray-600 hover:text-gray-900">Terms of Service</nuxt-link></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-200 mt-8 pt-8 mx-3">
                <div class="flex flex-wrap items-center justify-between">
                    <div class="text-gray-600 text-sm">
                        © 2023 Linkvoices. All rights reserved.
                    </div>
                    <div class="flex space-x-6">
                        <a href="https://twitter.com/babakzy" target="_blank" rel="noopener" class="text-gray-600 hover:text-gray-900">
                            <span class="sr-only">Twitter</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                        </a>
                        <a href="https://github.com/babakzy/linkvoices" target="_blank" rel="noopener" class="text-gray-600 hover:text-gray-900">
                            <span class="sr-only">GitHub</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
</script>

<style scoped></style>