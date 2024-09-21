<template>
    <div>
        <div class=" bg-gradient-to-br from-blue-900 bg-slate-600  py-8">
            <div class=" md:max-w-[1024px] mx-auto p-3">
<div class="m-2 text-right"><button @click="downloadInvoice" class="btn btn-primary "> Download  </button></div>
                <div ref="invoicePaper" v-if="invoiceInfo" class="bg-slate-50 max-w-full rounded-lg  p-4  md:p-16 m-2 ">

                    <div class="flex flex-wrap">
                        <div class="basis-full">
                            <h1 class="text-5xl text-slate-800 mb-5 uppercase">Invoice</h1>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2">
                            <b class="block text-slate-800">{{ invoiceInfo.from_info.name }}</b>
                            <span class="block text-slate-600">{{ invoiceInfo.from_info.country }}</span>
                            <p class="block text-slate-600">{{ invoiceInfo.from_info.city }}</p>
                            <p class="block text-slate-600">{{ invoiceInfo.from_info.address }}</p>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2">
                            <label class="label-text block text-slate-400 font-light">Issued Date:</label>
                            <b>{{ convertToSimpleDate(issueDate) }}</b>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2 text-right font-light">
                            <label class="label-text text-slate-400">Invoice #:</label>
                            <b>{{ invoiceNumber }}</b>
                            <!-- <label class="label-text block text-slate-400">Due Date:</label>
                            <b>{{convertToSimpleDate(dueDate) }}</b>     -->
                        </div>

                    </div>
                    <div class="flex flex-wrap">
                        <div class="basis-full">
                            <hr class=" border-b w-full my-4" />
                        </div>
                        <div class="basis-full md:basis-1/2 p-2">
                            <h3 class="text-2xl text-slate-600">Bill To</h3>
                            <b class="block text-slate-800">{{ invoiceInfo.to_info.name }}</b>
                            <span class="block text-slate-600">{{ invoiceInfo.to_info.country }}</span>
                            <p class="block text-slate-600">{{ invoiceInfo.to_info.city }}</p>
                            <p class="block text-slate-600">{{ invoiceInfo.to_info.address }}</p>

                        </div>

                        <div class="basis-full p-2">
                            <div class=" border-2 border-slate-200 rounded-lg p-4">
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
                                            <th class=" text-slate-500 font-light">{{ index + 1 }}</th>
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
                    <div class=" bg-gradient-to-br from-green-100 to-slate-100 rounded-lg m-2 p-4 md:p-8">
                        <h4 class="inline-block mr-2 text-xl">Currency</h4>
                        {{ invoiceInfo.currency }}
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
const invoiceInfo = ref(null)
const invoicePaper = ref(null)

async function getInvoiceById(id) {
    let { data, error } = await supabase
        .from('invoices')
        .select("*")
        // Filters
        .eq('invoice_uuid', id)
    console.log(error);
    console.log(data);
    if (data.length) {
        invoiceInfo.value = data[0]
        invoiceNumber.value = data[0].number;
        senderEmail.value = data[0].from;
        recieverEmail.value = data[0].to;
        invoiceNumber.value = data[0].number;
    }
}

function downloadInvoice(){
    const doc = new jsPDF();
console.log(invoicePaper.value);
doc.html(invoicePaper.value, {
   callback: function (doc) {
     doc.save();
   },
   x: 10,
   y: 10
});
//doc.save("a4.pdf");
}

onMounted(() => {
    getInvoiceById(route.params.id)
})



</script>

<style scoped></style>