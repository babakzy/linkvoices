<template>
    <div class="my-16">
        <div class="flex flex-wrap">
            <div class="basis-full md:basis-3/4">
                <div class="bg-slate-100 rounded-lg  p-4 md:p-8 m-2 ">
                    <div class="flex">
                        <div class="basis-full md:basis-1/3 p-2">
                            <label class="form-control w-full m-1">
                                <div class="label">
                                    <span class="label-text">Invoice Number:</span>
                                </div>
                                <input v-model="invoiceNumber" type="text" placeholder="00001"
                                    class="input rounded-md py-3 input-bordered  w-full" />
                            </label>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2">
                            <label class="form-control w-full m-1">
                                <div class="label">
                                    <span class="label-text">Date Issued:</span>
                                </div>
                                <VueDatePicker v-model="issueDate" :enable-time-picker="false"></VueDatePicker>
                            </label>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2">
                            <label class="form-control w-full m-1">
                                <div class="label">
                                    <span class="label-text">Due Date:</span>
                                </div>
                                <VueDatePicker v-model="dueDate" :enable-time-picker="false"></VueDatePicker>
                            </label>
                        </div>

                    </div>
                    <div class="flex">
                        <div class="basis-full md:basis-1/2 p-2">
                            <div class="bg-slate-200 rounded-lg p-4">
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">E-mail:</span>
                                    </div>
                                    <input required v-model="senderEmail" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Company/Person Name:</span>
                                    </div>
                                    <input v-model="senderName" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Address:</span>
                                    </div>
                                    <input v-model="senderAddress" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">City, State, ZIP:</span>
                                    </div>
                                    <input v-model="senderCity" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Country:</span>
                                    </div>
                                    <input v-model="senderCountry" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>

                            </div>
                        </div>

                        <div class="basis-full md:basis-1/2 p-2">
                            <div class="bg-slate-200 rounded-lg p-4">
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">E-mail:</span>
                                    </div>
                                    <input v-model="recieverEmail" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Company/person Name:</span>
                                    </div>
                                    <input v-model="recieverName" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Address:</span>
                                    </div>
                                    <input v-model="recieverAddress" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">City, State, ZIP:</span>
                                    </div>
                                    <input v-model="recieverCity" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Country:</span>
                                    </div>
                                    <input v-model="recieverCountry" type="text" placeholder=""
                                        class="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="bg-slate-200 rounded-lg m-2 p-4 md:p-8">
                        <h4 class="inline-block mr-2 text-xl">Currency</h4>
                        <p class="text-slate-600 mb-3">* In order to list the currency here you MUST enter your realted
                            wallet address first.</p>
                        <select v-model="invoiceCurrency" class="select select-bordered inline-block">
                            <option disabled selected>Select Base Currency</option>
                            <option v-if="btcWallet" value="btc">Bitcoin (BTC)</option>
                            <option v-if="ethWallet" value="ethtrc20">Etherium (ETH) _ TRC20 Network</option>
                            <option v-if="usdttrc20Wallet" value="usdt">Tether (USDT)</option>
                            <option v-if="daiWallet" value="dai">Dai (DAI)</option>
                        </select>
                    </div>
                    <div class="overflow-x-auto bg-slate-200 rounded-lg m-2 p-4 md:p-8">
                        <form ref="itemsForm">
                            <table class="table">
                                <!-- head -->
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Rate</th>
                                        <th>Tax</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- row  -->
                                    <tr v-for="(item, index) in formRow" :key="index">
                                        <th>{{ index + 1 }}</th>
                                        <td>
                                            <input type="text" :name="'item-name' + index" placeholder="Web Design"
                                                class="input input-bordered input-sm w-full max-w-xs" />
                                        </td>
                                        <td>
                                            <input type="text" :name="'item-quantity' + index" placeholder="2"
                                                class="input input-bordered input-sm w-full max-w-xs" />
                                        </td>
                                        <td>
                                            <input type="text" :name="'item-rate' + index" placeholder="2.420"
                                                class="input input-bordered input-sm w-full max-w-xs" />
                                        </td>
                                        <td>
                                            <input type="text" :name="'item-tax' + index" placeholder="12%"
                                                class="input input-bordered input-sm w-full max-w-xs" />
                                        </td>
                                        <td>
                                            <input type="text" :name="'item-amount' + index" placeholder="0.840"
                                                class="input input-bordered input-sm w-full max-w-xs" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        <div class="">
                            <button @click="addField"
                                class=" h-10 w-10 btn-outline bg-black !text-white text-2xl rounded-full m-2 ">
                                +
                            </button>
                            <button @click="removeField"
                                class="h-10 w-10 border-2 text-2xl border-gray-300 !text-gray-300 btn-outline btn-error rounded-full ">
                                -
                            </button>
                        </div>
                    </div>
                    <div class="basis-full">
                        <div class="flex">
                            <div class="basis-full md:basis-3/4">
                            </div>
                            <div class="basis-full md:basis-1/4 ">
                                <h2 class="text-xl my-0 font-bold mt-5">Total:</h2>
                                <input type="text" v-model="invoiceTotal" placeholder=""
                                    class="input input-bordered w-full md:mr-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="basis-full md:basis-1/4">
                <div class="bg-slate-100 rounded-lg  p-4 md:p-8 m-2 ">
                    <button v-if="!invoice_uuid" class="btn btn-primary px-14" @click="createInvoice">Save</button>
                    <button v-if="invoice_uuid" class="btn btn-primary px-12" @click="updateInvoice">Save
                        (Update)</button>
                    <button :disabled="!invoice_uuid" class="btn btn-secondary ml-2"
                        @click="previewInvoice">Preview</button>
                    <p class="text-slate-400 text-sm font-light mt-2">* Saving won't send the invoice.</p>
                    <!-- <button :disabled="!invoice_uuid"
                        :href="'mailto:' + recieverEmail + '?subject=Invoice From:' + senderName + '&body=Hi, You have a new unpaid invoice %0D%0A%0D%0A' + ''"
                        class="btn btn-secondary ml-2" @click="createInvoice">Send</button> -->
                    <div class="mt-2">

                    </div>
                    <div v-if="invoice_uuid" class="my-2">
                        <span class="text-sm text-slate-700">URL:</span> <a
                            :href="'http://localhost:3000/invoice/' + invoice_uuid" v-if="invoice_uuid" target="_blank"
                            class="text-left text-sm text-blue-500 link w-full">http://localhost:3000/invoice/{{
                                invoice_uuid }}</a>
                    </div>
                    <div v-if="invoice_uuid" class="my-2">
                        <button @click="copyToClipboard('http://localhost:3000/invoice/' + invoice_uuid)"
                            class="btn btn-neutral blcok w-full md:inline-block md:w-auto text-md h-auto min-h-4 py-2">Copy
                            URL</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
definePageMeta({
    layout: 'default-page'
})
useHead({
    title: 'Dashboard - Create Crypto Invoice'
})
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import convertToSimpleDate from '~/utils';

const supabase = useSupabaseClient()
const invoiceNumber = ref("001")
const issueDate = ref(new Date())
const dueDate = ref(new Date())
const senderEmail = ref("")
const recieverEmail = ref("")
const senderName = ref("")
const senderAddress = ref("")
const senderCity = ref("")
const senderCountry = ref("")
const recieverName = ref("")
const recieverAddress = ref("")
const recieverCity = ref("")
const recieverCountry = ref("")
const invoiceCurrency = ref("")
let invoiceItems = []
const itemsForm = ref(null)
const formRow = ref(['', ''])
const invoiceTotal = ref("")
const btcWallet = ref("")
const ethWallet = ref("")
const usdttrc20Wallet = ref("")
const daiWallet = ref("")
const invoice_uuid = ref(null)
let invoiceWalletAddress = ""

onMounted(() => {
    readProfile();
})

async function readProfile() {

    let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
    console.log(profile);
    console.log(error);
    btcWallet.value = profile[0].btc_wallet
    ethWallet.value = profile[0].eth_wallet
    daiWallet.value = profile[0].dai_wallet
    usdttrc20Wallet.value = profile[0].usdt_trc20_wallet
}

function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy);
    alert("Copied to clipboard");
}

const addField = () => {
    formRow.value.push('');
}
const removeField = () => {
    formRow.value.pop()
}

function getInvoiceSelectedWalletAddress() {

    switch (invoiceCurrency.value) {
        case 'btc':
            invoiceWalletAddress = btcWallet.value;
            break;
        case 'ethtrc20':
            invoiceWalletAddress = ethWallet.value;
            break;
        case 'usdt':
            invoiceWalletAddress = usdttrc20Wallet.value;
            break;
        case 'dai':
            invoiceWalletAddress = daiWallet.value;
            break;
        default:
            invoiceWalletAddress = "";
    }

}

let invoiceItemsNameArray = []
let invoiceItemsQuantityArray = []
let invoiceItemsRateArray = []
let invoiceItemsTaxArray = []
let invoiceItemsAmountArray = []
function getInvoiceItems() {

    const formData = new FormData(itemsForm.value)
    for (const [fieldName, fieldValue] of formData.entries()) {

        if (fieldName.includes('item-name')) {
            invoiceItemsNameArray.push(fieldValue)
        }
        else if (fieldName.includes('item-quantity')) {
            invoiceItemsQuantityArray.push(fieldValue)
        }
        else if (fieldName.includes('item-rate')) {
            invoiceItemsRateArray.push(fieldValue)
        }
        else if (fieldName.includes('item-tax')) {
            invoiceItemsTaxArray.push(fieldValue)
        }
        else if (fieldName.includes('item-amount')) {
            invoiceItemsAmountArray.push(fieldValue)
        }

    }

    for (let itemIndex in invoiceItemsNameArray) {
        invoiceItems.push({
            'name': invoiceItemsNameArray[itemIndex],
            'quantity': invoiceItemsQuantityArray[itemIndex],
            'rate': invoiceItemsRateArray[itemIndex],
            'tax': invoiceItemsTaxArray[itemIndex],
            'amount': invoiceItemsAmountArray[itemIndex],
        })

    }

}

async function createInvoice() {

    let issueDateConverted = convertToSimpleDate(issueDate)
    let dueDateConverted = convertToSimpleDate(dueDate)
    getInvoiceSelectedWalletAddress()
    getInvoiceItems();
    const { data, error } = await supabase
        .from('invoices')
        .insert([
            {
                number: invoiceNumber.value,
                issue_date: issueDate.value,
                due_date: dueDate.value,
                from: senderEmail.value,
                to: recieverEmail.value,
                from_info: { 'name': senderName.value, 'address': senderAddress.value, 'city': senderCity.value, 'country': senderCountry.value },
                to_info: { 'name': recieverName.value, 'address': recieverAddress.value, 'city': recieverCity.value, 'country': recieverCountry.value },
                status: 'not_paid',
                currency: invoiceCurrency.value,
                items: invoiceItems,
                wallet_address: invoiceWalletAddress,
                total: invoiceTotal.value
            },
        ])
        .select()
    // itemsForm.value.reset()
    invoice_uuid.value = data[0].invoice_uuid

}


async function updateInvoice() {

    let issueDateConverted = convertToSimpleDate(issueDate)
    let dueDateConverted = convertToSimpleDate(dueDate)
    getInvoiceItems();

    const { data, error } = await supabase
        .from('invoices')
        .update([
            {
                number: invoiceNumber.value,
                issue_date: issueDate.value,
                due_date: dueDate.value,
                from: senderEmail.value,
                to: recieverEmail.value,
                from_info: { 'name': senderName.value, 'address': senderAddress.value, 'city': senderCity.value, 'country': senderCountry.value },
                to_info: { 'name': recieverName.value, 'address': recieverAddress.value, 'city': recieverCity.value, 'country': recieverCountry.value },
                status: 'not_paid',
                currency: invoiceCurrency.value,
                total: invoiceTotal.value
            },
        ])
        .eq('invoice_uuid', invoice_uuid.value)
        .select()

}

function previewInvoice() {
    window.open('http://localhost:3000/invoice/' + invoice_uuid.value, '_blank').focus();
}

</script>

<style scoped>

</style>