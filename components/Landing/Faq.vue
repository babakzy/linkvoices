<template>
    <section
        class="border-b border-black bg-spring-wood-100 px-4 py-16 md:px-6 md:py-24"
        aria-labelledby="home-faq-heading"
        itemscope
        itemtype="https://schema.org/FAQPage"
    >
        <div class="flex flex-wrap content-center justify-center">
            <div class="basis-full md:max-w-5xl">
                <h2 id="home-faq-heading" class="mb-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink md:text-5xl" itemprop="name">
                    Cryptocurrency Invoicing FAQ
                </h2>
                <p class="mb-8 max-w-2xl text-base text-neutral-700">
                    Common questions about sending free crypto invoices with Linkvoices.
                </p>
                <div class="space-y-3">
                    <details
                        v-for="(faq, index) in homeFaqs"
                        :key="index"
                        class="group overflow-hidden rounded-ui border border-black bg-white"
                        itemprop="mainEntity"
                        itemscope
                        itemtype="https://schema.org/Question"
                    >
                        <summary class="flex cursor-pointer list-none items-center justify-between gap-3 p-4 marker:content-none md:px-5">
                            <h3 class="text-base font-medium text-ink" itemprop="name">
                                {{ faq.question }}
                            </h3>
                            <span class="shrink-0 font-mono text-xs transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div
                            class="border-t border-black px-4 py-4 md:px-5"
                            itemprop="acceptedAnswer"
                            itemscope
                            itemtype="https://schema.org/Answer"
                        >
                            <p class="max-w-3xl text-sm leading-relaxed text-neutral-700" itemprop="text">{{ faq.answer }}</p>
                        </div>
                    </details>
                </div>
                <p class="mt-6 text-sm text-neutral-700">
                    More on network fees, privacy, and wallet setup in the
                    <NuxtLink to="/faq" class="font-medium text-brand-blue underline-offset-4 hover:underline">full FAQ</NuxtLink>.
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
