<template>
    <section
        class="md:container md:mx-auto px-4 py-12 md:py-16"
        aria-labelledby="home-faq-heading"
        itemscope
        itemtype="https://schema.org/FAQPage"
    >
        <div class="flex flex-wrap content-center justify-center">
            <div class="basis-full md:basis-5/6">
                <h2 id="home-faq-heading" class="text-2xl text-spring-wood-900 mb-2" itemprop="name">
                    Cryptocurrency Invoicing FAQ
                </h2>
                <p class="text-sm text-gray-600 mb-4">
                    Common questions about sending free crypto invoices with Linkvoices.
                </p>
                <div class="space-y-2">
                    <details
                        v-for="(faq, index) in homeFaqs"
                        :key="index"
                        class="bg-spring-wood-100 rounded overflow-hidden group"
                        itemprop="mainEntity"
                        itemscope
                        itemtype="https://schema.org/Question"
                    >
                        <summary class="p-3 cursor-pointer list-none flex justify-between items-center gap-3 marker:content-none">
                            <h3 class="text-base font-medium text-spring-wood-900" itemprop="name">
                                {{ faq.question }}
                            </h3>
                            <span class="text-sm shrink-0 transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div
                            class="px-3 pb-3"
                            itemprop="acceptedAnswer"
                            itemscope
                            itemtype="https://schema.org/Answer"
                        >
                            <p class="text-sm text-gray-700" itemprop="text">{{ faq.answer }}</p>
                        </div>
                    </details>
                </div>
                <p class="mt-4 text-sm text-gray-600">
                    More on network fees, privacy, and wallet setup in the
                    <NuxtLink to="/faq" class="text-cerulean-blue-600 hover:text-cerulean-blue-700">full FAQ</NuxtLink>.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { homeFaqs } from '~/data/homeFaq.js'
</script>

<style lang="scss" scoped>
summary::-webkit-details-marker {
    display: none;
}
</style>
