<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8" itemscope itemtype="https://schema.org/FAQPage">
        <div class="max-w-7xl mx-auto">
            <div class="text-center">
                <h2 class="text-3xl mt-20 font-bold text-black-900 sm:text-4xl lg:text-5xl" itemprop="name">Frequently Asked Questions
                </h2>
                <p class="mt-4 text-xl text-black-600">Find answers to common questions about our service</p>
            </div>
            <div class="basis-full md:basis-5/6 mt-12 md:mt-28">
                <h3 class="text-3xl text-spring-wood-900 mb-6">FAQ</h3>
                <div class="space-y-4">
                    <div class="bg-spring-wood-100 rounded overflow-hidden" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
                        <button @click="toggleFaq(1)" class="w-full p-5 text-left flex justify-between items-center" itemprop="name">
                            <h4 class="text-xl font-medium text-spring-wood-900">Is there any fee to use this tool?</h4>
                            <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 1 }">
                                ▼
                            </span>
                        </button>
                        <div v-show="activeFaq === 1" class="p-5 pt-0" itemprop="acceptedAnswer" itemscope  itemtype="https://schema.org/Answer">
                            <p class="text-gray-700" itemprop="text">No, we don't charge any extra fees for creating or sending
                                invoices. You only pay the standard network fee for cryptocurrency transactions.</p>
                        </div>
                    </div>

                    <div class="bg-spring-wood-100 rounded overflow-hidden" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
                        <button @click="toggleFaq(2)" class="w-full p-5 text-left flex justify-between items-center" itemprop="name">
                            <h4 class="text-xl font-medium text-spring-wood-900">Which cryptocurrencies are supported?
                            </h4>
                            <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 2 }">
                                ▼
                            </span>
                        </button>
                        <div v-show="activeFaq === 2" class="p-5 pt-0" itemprop="acceptedAnswer" itemscope  itemtype="https://schema.org/Answer">
                            <p class="text-gray-700" itemprop="text">We currently support multiple cryptocurrencies, including Bitcoin,
                                Ethereum, Tether (USDT), and DAI.</p>
                        </div>
                    </div>

                    <div class="bg-spring-wood-100 rounded overflow-hidden" itemprop="mainEntity" itemscope  itemtype="https://schema.org/Question">
                        <button @click="toggleFaq(3)" class="w-full p-5 text-left flex justify-between items-center" itemprop="name">
                            <h4 class="text-xl font-medium text-spring-wood-900">How do I get started?</h4>
                            <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 3 }">
                                ▼
                            </span>
                        </button>
                        <div v-show="activeFaq === 3" class="p-5 pt-0" itemprop="acceptedAnswer" itemscope  itemtype="https://schema.org/Answer">
                            <p class="text-gray-700" itemprop="text">
                                1. Register: Sign up for an account.<br>
                                2. Add Wallet: Add your preferred wallet address for receiving payments. ( <NuxtLink class=" text-cerulean-blue-600" to="blog/setup-crypto-wallet">Create a crypto wallet</NuxtLink> )<br>
                                3. Send Invoices: Create and send invoices to your clients or customers.<br>
                                4. Notifications: Get notified as soon as the payment is received.
                            </p>
                        </div>
                    </div>

                    <div class="bg-spring-wood-100 rounded overflow-hidden" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
                        <button @click="toggleFaq(4)" class="w-full p-5 text-left flex justify-between items-center" itemprop="name">
                            <h4 class="text-xl font-medium text-spring-wood-900">How does this tool ensure privacy?</h4>
                            <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 4 }">
                                ▼
                            </span>
                        </button>
                        <div v-show="activeFaq === 4" class="p-5 pt-0" itemprop="acceptedAnswer" itemscope  itemtype="https://schema.org/Answer">
                            <p class="text-gray-700" itemprop="text">Your transactions are managed directly on the blockchain, ensuring
                                a high level of privacy and security. No sensitive information is stored or shared.</p>
                        </div>
                    </div>

                    <div class="bg-spring-wood-100 rounded overflow-hidden" itemprop="mainEntity" itemscope  itemtype="https://schema.org/Question">
                        <button @click="toggleFaq(5)" class="w-full p-5 text-left flex justify-between items-center" itemprop="name">
                            <h4 class="text-xl font-medium text-spring-wood-900">Can I use this tool for international
                                payments?</h4>
                            <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 5 }">
                                ▼
                            </span>
                        </button>
                        <div v-show="activeFaq === 5" class="p-5 pt-0" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                            <p class="text-gray-700" itemprop="text">Yes! Since it's based on cryptocurrencies, you can send and receive
                                payments globally without worrying about exchange rates or banking restrictions.</p>
                        </div>
                    </div>

                    <div class="bg-spring-wood-100 rounded overflow-hidden" itemprop="mainEntity" itemscope  itemtype="https://schema.org/Question">
                        <button @click="toggleFaq(6)" class="w-full p-5 text-left flex justify-between items-center" itemprop="name">
                            <h4 class="text-xl font-medium text-spring-wood-900">Why choose this tool over traditional
                                invoicing platforms?</h4>
                            <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 6 }">
                                ▼
                            </span>
                        </button>
                        <div v-show="activeFaq === 6" class="p-5 pt-0" itemprop="acceptedAnswer" itemscope  itemtype="https://schema.org/Answer">
                            <p class="text-gray-700" itemprop="text">This tool is simple, clear, and empowers you with privacy and
                                freedom.
                                Unlike traditional systems, it doesn't rely on banks or centralized authorities and has
                                no hidden fees.</p>
                        </div>
                    </div>

                    <div class="bg-spring-wood-100 rounded overflow-hidden" itemprop="mainEntity" itemscopeitemtype="https://schema.org/Question">
                        <button @click="toggleFaq(7)" class="w-full p-5 text-left flex justify-between items-center" itemprop="name">
                            <h4 class="text-xl font-medium text-spring-wood-900">How much is the crypto payment network
                                fee?
                            </h4>
                            <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 7 }">
                                ▼
                            </span>
                        </button>
                        <div v-show="activeFaq === 7" class="p-5 pt-0" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                            <div class="overflow-x-auto">
                                <table class="w-full text-gray-700">
                                    <thead class="bg-spring-wood-200">
                                        <tr>
                                            <th class="p-3 text-left">Cryptocurrency</th>
                                            <th class="p-3 text-left">Network</th>
                                            <th class="p-3 text-left">Typical Network Fee (for $1000 transfer)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b border-spring-wood-200">
                                            <td class="p-3">Bitcoin (BTC)</td>
                                            <td class="p-3">Bitcoin</td>
                                            <td class="p-3">$2 - $8</td>
                                        </tr>
                                        <tr class="border-b border-spring-wood-200">
                                            <td class="p-3">Ethereum (ETH)</td>
                                            <td class="p-3">Ethereum</td>
                                            <td class="p-3">$2 - $15</td>
                                        </tr>
                                        <tr class="border-b border-spring-wood-200">
                                            <td class="p-3">Tether (USDT)</td>
                                            <td class="p-3">Tron</td>
                                            <td class="p-3">$0.1 - $1</td>
                                        </tr>
                                        <tr>
                                            <td class="p-3">DAI</td>
                                            <td class="p-3">Ethereum</td>
                                            <td class="p-3">$2 - $15</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="bg-spring-wood-100 rounded overflow-hidden" itemprop="mainEntity" itemscope  itemtype="https://schema.org/Question">
                        <button @click="toggleFaq(8)" class="w-full p-5 text-left flex justify-between items-center" itemprop="name">
                            <h4 class="text-xl font-medium text-spring-wood-900">How will I know when I've been paid?
                            </h4>
                            <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 8 }">
                                ▼
                            </span>
                        </button>
                        <div v-show="activeFaq === 8" class="p-5 pt-0" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                            <p class="text-gray-700" itemprop="text">You'll receive a notification as soon as the payment is confirmed
                                on
                                the blockchain.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>


const faqSchema = ref({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Is there any fee to use this tool?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, we don't charge any extra fees for creating or sending invoices. You only pay the standard network fee for cryptocurrency transactions."
            }
        },
        {
            "@type": "Question",
            "name": "Which cryptocurrencies are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We currently support multiple cryptocurrencies, including Bitcoin, Ethereum, Tether (USDT), and DAI."
            }
        },
        {
            "@type": "Question",
            "name": "How do I get started?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "1. Register: Sign up for an account. 2. Add Wallet: Add your preferred wallet address for receiving payments. (Create a crypto wallet) 3. Send Invoices: Create and send invoices to your clients or customers. 4. Notifications: Get notified as soon as the payment is received."
            }
        },
        {
            "@type": "Question",
            "name": "How does this tool ensure privacy?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Your transactions are managed directly on the blockchain, ensuring a high level of privacy and security. No sensitive information is stored or shared."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use this tool for international payments?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Since it's based on cryptocurrencies, you can send and receive payments globally without worrying about exchange rates or banking restrictions."
            }
        },
        {
            "@type": "Question",
            "name": "Why choose this tool over traditional invoicing platforms?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "This tool is simple, clear, and empowers you with privacy and freedom. Unlike traditional systems, it doesn't rely on banks or centralized authorities and has no hidden fees."
            }
        },
        {
            "@type": "Question",
            "name": "How much is the crypto payment network fee?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The typical network fees vary by cryptocurrency. For example, Bitcoin (BTC) fees range from $2 - $8, Ethereum (ETH) fees range from $2 - $15, Tether (USDT) fees range from $0.1 - $1, and DAI fees range from $2 - $15."
            }
        },
        {
            "@type": "Question",
            "name": "How will I know when I've been paid?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You'll receive a notification as soon as the payment is confirmed on the blockchain."
            }
        }
    ]
});

// Use Nuxt SEO to add the schema to the head
useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(faqSchema.value)
        }
    ]
});


</script>

<style lang="scss" scoped></style>