<template>
    <div>
        <div class=" bg-gradient-to-br from-cerulean-blue-300 to-cerulean-blue-700 min-h-[100vh]  py-8 pb-16">

            <div class=" md:max-w-[1024px] mx-auto p-3">
                <!-- <div class="m-2 text-right"><button @click="downloadInvoice" class="btn btn-primary "> Download
                    </button></div> -->
                <div v-if="!invoiceInfo">
                    <div class="text-center mt-[40vh]">
                        <span class="loading loading-ring loading-lg text-white"></span>
                        <p class="text-black-300">Loading Invoice</p>
                    </div>
                </div>
                <div ref="invoicePaper" v-if="invoiceInfo" class="bg-white max-w-full rounded-lg  p-4  md:p-16 m-2 ">

                    <div class="flex flex-wrap">
                        <div class="basis-full">
                            <h1 class=" text-3xl md:text-5xl text-black-800 mb-5 uppercase">Invoice</h1>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2">
           <h2 class=" text-xl md:text-2xl text-black-400 font-normal">From</h2>
                            <b class="block text-xl text-black-800">{{ invoiceInfo.from_info.name }}</b>
                            <span class="block text-black-600">{{ senderEmail }}</span>
                            <p class="block text-black-600">{{ invoiceInfo.from_info.address }}</p>
                            <p class="block text-black-600">{{ invoiceInfo.from_info.city }}</p>
                            <span class="block text-black-600">{{ invoiceInfo.from_info.country }}</span>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2">
                            <label class="label-text block text-black-400 font-light">Issued Date:</label>
                            <b>{{ convertToSimpleDate(issueDate) }}</b>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2 text-right font-light">
                            <label class="label-text text-black-400">Invoice #:</label>
                            <b>{{ invoiceNumber }}</b>
                            <!-- <label class="label-text block text-black-400">Due Date:</label>
                            <b>{{convertToSimpleDate(dueDate) }}</b>     -->
                        </div>

                    </div>
                    <div class="flex flex-wrap">
                        <div class="basis-full">
                            <hr class=" border-b w-full my-4" />
                        </div>
                        <div class="basis-full md:basis-1/2 p-2">
                            <h3 class="text-xl md:text-2xl text-black-400 font-normal">Bill To</h3>
                            <b class="block text-black-800">{{ invoiceInfo.to_info.name }}</b>
                            <p class="block text-black-600">{{ recieverEmail }}</p>
                            <p class="block text-black-600">{{ invoiceInfo.to_info.address }}</p>
                            <p class="block text-black-600">{{ invoiceInfo.to_info.city }}</p>
                            <span class="block text-black-600">{{ invoiceInfo.to_info.country }}</span>
                         
            

                        </div>

                        <div class="basis-full max-w-full p-2">
                            <div class=" border-2 border-black-200 rounded-lg p-4 w-full overflow-x-scroll">
                                <table class="table">
                                    <!-- head -->
                                    <thead>
                                        <tr class=" ">
                                            <th class="font-light">#</th>
                                            <th class="font-light">Item Name</th>
                                            <th class="font-light">Quantity</th>
                                            <th class="font-light">Rate</th>
                                            <th class="font-light">Tax</th>
                                            <th class="font-light">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- row  -->
                                        <tr v-for="(item, index) in invoiceInfo.items" :key="index">
                                            <th class=" text-black-500 font-light">{{ index + 1 }}</th>
                                            <td>
                                                {{ item.name }}
                                            </td>
                                            <td>
                                                {{ item.quantity }}
                                            </td>
                                            <td>
                                                {{ item.rate }}
                                            </td>
                                            <td>
                                                {{ item.tax }}
                                            </td>
                                            <td>
                                                {{ item.amount }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div class="border-2 border-black-200 border-t-0 rounded-lg mt-0 m-2 p-4 md:p-8">
                        <div class="flex flex-wrap justify-end items-end">
                            <div class=" basis-full md:basis-1/4">
                                <h4 class="inline-block mr-2 text-md font-light text-black-500 mb-2">Currency:</h4>
                                <div v-if="invoiceInfo.currency == 'btc'" class="invoice-currency-item">
                                    <img src="/assets/images/bitcoin-btc-logo.svg" class="inline-block w-7 h-7"
                                        alt="BTC">
                                    Bitcoin (BTC)

                                </div>
                                <div v-else-if="invoiceInfo.currency == 'ethtrc20'" class="invoice-currency-item">
                                    <img src="/assets/images/ethereum-eth-logo.svg" class="inline-block w-7 h-7"
                                        alt="ETH">
                                    Etherium (ETH) _ TRC20 Network

                                </div>
                                <div v-else-if="invoiceInfo.currency == 'usdt'" class="invoice-currency-item">
                                    <img src="/assets/images/tether-usdt-logo.svg" class="inline-block w-7 h-7"
                                        alt="USDT">
                                    Tether (USDT)

                                </div>
                                <div v-else-if="invoiceInfo.currency == 'dai'" class="invoice-currency-item">
                                    <img src="/assets/images/multi-collateral-dai-dai-logo.svg"
                                        class="inline-block w-7 h-7" alt="DAI">
                                    Dai (DAI)

                                </div>
                            </div>
                            <div class=" basis-full md:basis-1/4">
                                <h4 class="inline-block mr-2 text-md font-light text-black-500 mb-1">Total:</h4>
                                <h3 class="text-2xl font-bold text-black-900">{{ invoiceTotal }} <span
                                        class="text-sm font-normal text-black-600">{{ invoiceInfo.currency }}</span>
                                </h3>
                            </div>
                            <!-- <div class=" basis-full md:basis-1/4">
                                <div class="md:ml-4">
                                    <h4 class=" mr-2 text-md font-light text-black-500 mt-3">Status:</h4>
                                    <span
                                        class="bg-black-200 inline-block mt-2 rounded-full p-2 px-4 text-black-700">Not
                                        Paid</span>
                                </div>
                            </div> -->
                            <div class=" basis-full md:basis-1/4">
                                <button @click="showPaymentInfo = true" class="btn bg-cerulean-blue-400 hover:bg-cerulean-blue-500 w-full">Pay</button>
                            </div>
                        </div> 

                    </div>
                    <div v-if="showPaymentInfo"
                        class=" bg-gradient-to-br from-green-100 to-black-100 rounded-lg m-2 p-4 md:p-8">
                        <div class="flex flex-wrap mt-4">
                            <p class="mr-2 text-xl font-bold  text-black-800 mb-1"> <span
                                    class="h-7 w-7 text-center inline-block bg-black-800  text-spring-wood-100 rounded-full">1</span>
                                Send {{ invoiceTotal }}<span class="">{{ invoiceInfo.currency }}</span> to address below
                            </p>
                            <div class=" basis-full  max-w-full md:basis-3/4">
                                <div class="label mt-4">
                                    <span class="label-text">Sender wallet address:</span>
                                </div> <b
                                    class="text-md max-w-full break-words inline-block bg-green-50 border border-black-300 px-3 py-2 rounded-md font-normal text-black-900">{{
                                        invoiceWalletAddress }} <button @click="copyToClipboard(invoiceWalletAddress)"
                                        class="btn btn-neutral blcok w-full md:inline-block md:w-auto text-md h-auto md:ml-2 mt-3 md:mt-0 min-h-4 py-2">Copy</button></b>
                            </div>
                            <div class=" basis-full md:basis-1/4">
                            </div>
                        </div>
                        <div class="flex flex-wrap items-end mt-14">
                            <p class="mr-2 text-xl font-bold   text-black-800 mb-1"> <span
                                    class="h-7 w-7 text-center inline-block bg-black-800 text-spring-wood-100 text-white rounded-full">2</span>
                                Enter payments Transcation ID </p>
                            <div class=" basis-full  max-w-full md:basis-3/4">
                                <div class="label mt-4">
                                    <span class="label-text">Transcation_id/TxId (Optional)</span>
                                </div>
                                <label class="input input-bordered flex items-center gap-2">
                                    <input v-model="transactionID" type="text" class="grow"
                                        placeholder="Enter transcation ID code here" />
                                </label>
                            </div>
                        </div>
                        <div class=" mt-6">
                            <button @click="paymentSubmited" class="btn bg-cerulean-blue-400 hover:bg-cerulean-blue-500 w-40">Paid</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import convertToSimpleDate from '~/utils';
const route = useRoute();
import { jsPDF } from "jspdf";
const supabase = useSupabaseClient()
const invoiceNumber = ref("001")
const issueDate = ref(new Date())
const dueDate = ref(new Date())
const senderEmail = ref("")
const recieverEmail = ref("")
let invoiceItems = []
const invoiceInfo = ref(null)
const invoicePaper = ref(null)
const invoiceTotal = ref(0)
const invoiceWalletAddress = ref("")
const showPaymentInfo = ref(false)
const transactionID = ref("")

definePageMeta({
    layout: false
})
useHead({
    title: 'Linkvoicses - Invoice'
})

onMounted(() => {
getInvoiceById(route.params.id)
})


async function getInvoiceById(id) {
    let { data, error } = await supabase
        .from('invoices')
        .select("*")
        // Filters
        .eq('invoice_uuid', id)
    if (data.length) {
        invoiceInfo.value = data[0]
        invoiceNumber.value = data[0].number;
        senderEmail.value = data[0].from;
        recieverEmail.value = data[0].to;
        invoiceNumber.value = data[0].number;
        invoiceTotal.value = data[0].total;
        invoiceWalletAddress.value = data[0].wallet_address;
    }
}


function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy);
    alert("Copied to clipboard");
}



async function paymentSubmited() {
    const { data, error } = await supabase
        .from('transactions')
        .insert([
            { transaction_id: transactionID.value, invoice_id: route.params.id },
        ])
        .select()
    if (data) {
        alert("Thanks for the payment we will validate and notify the sender.")
    }
    if (error) {
        alert("Problem to submit the information.")
    }
}

</script>

<style scoped></style>