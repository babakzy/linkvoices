<template>
    <div class="flex flex-wrap">
        <div class="basis-full  py-12 md:mt-20">
            <h2 class="text-3xl md:text-4xl text-spring-wood-900 capitalize">Why not push every one to use
                cryptocurrency to
                transfer money
            </h2>
        </div>
        <div class="basis-full md:basis-6/12 py-3 px-0 md:pr-3 ">
            <h4 class="text-spring-wood-900 text-2xl ">Used way</h4>
            <p class="text-sgray-600">(Paypal, Stripe , Wise , etc)</p>
            <div class="bg-spring-wood-200 text-gray-800 rounded p-5 mt-3 ">
                <ul class="text-xl font-medium">
                    <li class="my-2">Platforms or bank fee</li>
                    <li class="my-2">Central control (banks, governments)</li>
                    <li class="my-2">Limited currencies</li>
                    <li class="my-2">Empower authorities</li>
                </ul>
            </div>
        </div>
        <div class="basis-full md:basis-6/12 py-3 px-0 md:pl-3">
            <h4 class="text-spring-wood-900 text-2xl ">Linkvoices</h4>
            <p class="text-gray-600 ">Use cryptocurrencies as payment</p>
            <div class="bg-spring-wood-200 text-gray-800 rounded p-5  mt-3 ">
                <ul class="text-xl font-medium">
                    <li class="my-2">No extra fee (just network fee)</li>
                    <li class="my-2">Privacy and freedom</li>
                    <li class="my-2">Empower people ✊🏼</li>
                    <li class="my-2">Multiple cryptocurrencies</li>
                </ul>
            </div>
        </div>

        <div class="basis-full mt-12">
            <h3 class="text-3xl text-spring-wood-900 mb-6">Frequently Asked Questions</h3>
            <div class="space-y-4">
                <div class="bg-spring-wood-100 rounded overflow-hidden">
                    <button @click="toggleFaq(1)" class="w-full p-5 text-left flex justify-between items-center">
                        <h4 class="text-xl font-medium text-spring-wood-900">Is there any fee to use this tool?</h4>
                        <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 1 }">
                            ▼
                        </span>
                    </button>
                    <div v-show="activeFaq === 1" class="p-5 pt-0">
                        <p class="text-gray-700">No, we don't charge any extra fees for creating or sending invoices.
                            You only pay the standard network fee for cryptocurrency transactions.</p>
                    </div>
                </div>

                <div class="bg-spring-wood-100 rounded overflow-hidden">
                    <button @click="toggleFaq(2)" class="w-full p-5 text-left flex justify-between items-center">
                        <h4 class="text-xl font-medium text-spring-wood-900">Which cryptocurrencies are supported?</h4>
                        <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 2 }">
                            ▼
                        </span>
                    </button>
                    <div v-show="activeFaq === 2" class="p-5 pt-0">
                        <p class="text-gray-700">We currently support multiple cryptocurrencies, including Bitcoin,
                            Ethereum, Tether (USDT), and DAI.</p>
                    </div>
                </div>

                <div class="bg-spring-wood-100 rounded overflow-hidden">
                    <button @click="toggleFaq(3)" class="w-full p-5 text-left flex justify-between items-center">
                        <h4 class="text-xl font-medium text-spring-wood-900">How do I get started?</h4>
                        <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 3 }">
                            ▼
                        </span>
                    </button>
                    <div v-show="activeFaq === 3" class="p-5 pt-0">
                        <p class="text-gray-700">
                            1. Register: Sign up for an account.<br>
                            2. Add Wallet: Add your preferred wallet address for receiving payments.<br>
                            3. Send Invoices: Create and send invoices to your clients or customers.<br>
                            4. Notifications: Get notified as soon as the payment is received.
                        </p>
                    </div>
                </div>

                <div class="bg-spring-wood-100 rounded overflow-hidden">
                    <button @click="toggleFaq(4)" class="w-full p-5 text-left flex justify-between items-center">
                        <h4 class="text-xl font-medium text-spring-wood-900">How does this tool ensure privacy?</h4>
                        <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 4 }">
                            ▼
                        </span>
                    </button>
                    <div v-show="activeFaq === 4" class="p-5 pt-0">
                        <p class="text-gray-700">Your transactions are managed directly on the blockchain, ensuring a
                            high level of privacy and security. No sensitive information is stored or shared.</p>
                    </div>
                </div>

                <div class="bg-spring-wood-100 rounded overflow-hidden">
                    <button @click="toggleFaq(5)" class="w-full p-5 text-left flex justify-between items-center">
                        <h4 class="text-xl font-medium text-spring-wood-900">Can I use this tool for international
                            payments?</h4>
                        <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 5 }">
                            ▼
                        </span>
                    </button>
                    <div v-show="activeFaq === 5" class="p-5 pt-0">
                        <p class="text-gray-700">Yes! Since it's based on cryptocurrencies, you can send and receive
                            payments globally without worrying about exchange rates or banking restrictions.</p>
                    </div>
                </div>

                <div class="bg-spring-wood-100 rounded overflow-hidden">
                    <button @click="toggleFaq(6)" class="w-full p-5 text-left flex justify-between items-center">
                        <h4 class="text-xl font-medium text-spring-wood-900">Why choose this tool over traditional
                            invoicing platforms?</h4>
                        <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 6 }">
                            ▼
                        </span>
                    </button>
                    <div v-show="activeFaq === 6" class="p-5 pt-0">
                        <p class="text-gray-700">This tool is simple, clear, and empowers you with privacy and freedom.
                            Unlike traditional systems, it doesn't rely on banks or centralized authorities and has no
                            hidden fees.</p>
                    </div>
                </div>

                <div class="bg-spring-wood-100 rounded overflow-hidden">
                    <button @click="toggleFaq(7)" class="w-full p-5 text-left flex justify-between items-center">
                        <h4 class="text-xl font-medium text-spring-wood-900">How much is the crypto payment network fee?
                        </h4>
                        <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 7 }">
                            ▼
                        </span>
                    </button>
                    <div v-show="activeFaq === 7" class="p-5 pt-0">

                        <p class="text-gray-700">Bitcoin (BTC): Fees typically range from $1 to $5 but can spike during
                            high traffic.</p>
                        <p class="text-gray-700">Ethereum (ETH): Gas fees can range from $0.50 to $10+ based on network
                            congestion.</p>
                        <p class="text-gray-700">Tether (USDT): On Ethereum, fees are similar to ETH gas fees. On other
                            chains (e.g., Tron), fees are usually much lower.</p>
                        <p class="text-gray-700">DAI: Similar to Ethereum fees if using the ERC-20 version.</p>

                    </div>
                </div>

                <div class="bg-spring-wood-100 rounded overflow-hidden">
                    <button @click="toggleFaq(8)" class="w-full p-5 text-left flex justify-between items-center">
                        <h4 class="text-xl font-medium text-spring-wood-900">How will I know when I've been paid?</h4>
                        <span class="transform transition-transform" :class="{ 'rotate-180': activeFaq === 8 }">
                            ▼
                        </span>
                    </button>
                    <div v-show="activeFaq === 8" class="p-5 pt-0">
                        <p class="text-gray-700">You'll receive a notification as soon as the payment is confirmed on
                            the blockchain.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <p>
                <strong>Lower fees and faster transaction:</strong> Cryptocurrency transactions involve much lower fees
                compared to traditional bank transfers or payment services, especially for international transfers.
            </p>
            <!-- <p>
                Faster transactions: Unlike bank transfers that can take days, especially across borders, cryptocurrency transfers are processed quickly, often within minutes, regardless of the destination.
            </p> -->
            <p>
                <strong>Decentralized:</strong> Cryptocurrencies enable peer-to-peer transfers without the
                need for banks or other intermediaries, so cryptocurrencies are not controlled by any central authority
            </p>
            <p>
                <strong>Global accessibility:</strong>
                easier for people in regions with limited banking infrastructure to participate in financial
                transactions.
            </p>
            <p>
                <strong> Privacy: </strong> Cryptocurrency transactions can offer a higher degree of privacy compared to
                traditional banking, as <strong>users do not need to provide personal information beyond wallet
                    addresses.</strong>
            </p>
        </div>
    </div>
</template>

<script setup>

const activeFaq = ref(null)

const toggleFaq = (faqId) => {
    activeFaq.value = activeFaq.value === faqId ? null : faqId
}
</script>

<style lang="scss" scoped></style>