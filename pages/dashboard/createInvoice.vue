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
                                <input
                                    v-model="invoiceNumber"
                                    type="text"
                                    placeholder="00001"
                                    class="input rounded-md py-3 input-bordered  w-full"
                                />
                            </label>
                        </div>
                        <div class="basis-full md:basis-1/3 p-2">
                            <label class="form-control w-full m-1">
                                <div class="label">
                                    <span class="label-text">Date Issued:</span>
                                </div>
                                <VueDatePicker v-model="issueDate" :enable-time-picker="false" ></VueDatePicker>
                            </label>          
                        </div>
                        <div class="basis-full md:basis-1/3 p-2">
                            <label class="form-control w-full m-1">
                                <div class="label">
                                    <span class="label-text">Due Date:</span>
                                </div>
                                <VueDatePicker v-model="dueDate" :enable-time-picker="false" ></VueDatePicker>
                            </label>
                        </div>

                    </div>
                    <div class="flex">
                        <div class="basis-full md:basis-1/2 p-2">
                            <div class="bg-slate-200 rounded-lg p-4">
                                <!-- <h4 class="inline-block mr-2 text-xl">From</h4>
                                <select
                                    v-model="senderType"
                                    class="select select-bordered inline-block"
                                >
                                    <option
                                        disabled
                                        selected
                                    >Company / Person</option>
                                    <option value="personal">Person</option>
                                    <option value="company">Company</option>
                                </select> -->
                                <!-- <div class="label">
                                    <span class="label-text">Logo:</span>
                                </div>
                                <input
                                    type="file"
                                    class="file-input file-input-bordered w-full max-w-xs"
                                /> -->
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">E-mail:</span>
                                    </div>
                                    <input
                                       required                         
                                        v-model="senderEmail"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Company/Person Name:</span>
                                    </div>
                                    <input
                                      
                                        v-model="senderName"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Address:</span>
                                    </div>
                                    <input
                                        v-model="senderAddress"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">City, State, ZIP:</span>
                                    </div>
                                    <input
                                        v-model="senderCity"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Country:</span>
                                    </div>
                                    <input
                                        v-model="senderCountry"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>

                            </div>
                        </div>

                        <div class="basis-full md:basis-1/2 p-2">
                            <div class="bg-slate-200 rounded-lg p-4">
                                <!-- <h4 class="inline-block mr-2 text-xl">Bill To</h4>
                                <select
                                    v-model="recieverType"
                                    class="select select-bordered inline-block"
                                >
                                    <option
                                        disabled
                                        selected
                                    >Company / Person</option>
                                    <option value="personal">Person</option>
                                    <option value="company">Company</option>
                                </select> -->
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">E-mail:</span>
                                    </div>
                                    <input
                                        v-model="recieverEmail"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Company/person Name:</span>
                                    </div>
                                    <input
                                        v-model="recieverName"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Address:</span>
                                    </div>
                                    <input
                                        v-model="recieverAddress"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">City, State, ZIP:</span>
                                    </div>
                                    <input
                                        v-model="recieverCity"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>
                                <label class="form-control w-full m-1">
                                    <div class="label">
                                        <span class="label-text">Country:</span>
                                    </div>
                                    <input
                                        v-model="recieverCountry"
                                        type="text"
                                        placeholder=""
                                        class="input input-bordered w-full"
                                    />
                                </label>

                            </div>
                        </div>

                    </div>
                    <div class="bg-slate-200 rounded-lg m-2 p-4 md:p-8">
                        <h4 class="inline-block mr-2 text-xl">Currency</h4>
                        <select
                            v-model="invoiceCurrency"
                            class="select select-bordered inline-block"
                        >
                            <option
                                disabled
                                selected
                            >Select Base Currency</option>
                            <option value="btc">Bitcoin (BTC)</option>
                            <option value="ethtrc20">Etherium (ETH) _ TRC20 Network</option>
                            <option value="usdt">Tether (USDT)</option>
                            <option value="dai">Dai (DAI)</option>
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
                                <tr v-for="(item,index) in formRow" :key="index">
                                    <th>{{index+1}}</th>
                                    <td>
                                        <input
                                            type="text"
                                            :name="'item-name'+index"
                                            placeholder="Web Design"
                                            class="input input-bordered input-sm w-full max-w-xs"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            :name="'item-quantity'+index"
                                            placeholder="2"
                                            class="input input-bordered input-sm w-full max-w-xs"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                             :name="'item-rate'+index"
                                            placeholder="2.420"
                                            class="input input-bordered input-sm w-full max-w-xs"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                             :name="'item-tax'+index"
                                            placeholder="12%"
                                            class="input input-bordered input-sm w-full max-w-xs"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            :name="'item-amount'+index"
                                            placeholder="0.840"
                                            class="input input-bordered input-sm w-full max-w-xs"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </form>

                        <button @click="addField" class="btn btn-outline btn-primary  px-6">
                            Add More
                        </button>
                        <button @click="removeField" class="btn btn-outline btn-error  px-6 ml-2">
                           Remove Field
                        </button>
                    </div>
                    <button @click="getInvoiceItems" class="btn btn-circle"> TEST </button>

                </div>
            </div>
            <div class="basis-full md:basis-1/4">
                <div class="bg-slate-100 rounded-lg  p-4 md:p-8 m-2 ">
                    <button class="btn btn-primary px-14" @click="createInvoice">Save</button>
                    <button  class="btn btn-outline ml-2" @click="createInvoice">Priview</button>
                    <div class="mt-2">
                        <a :href="'mailto:' + recieverEmail +'?subject=Invoice From:' + senderName + '&body=Hi, You have a new unpaid invoice %0D%0A%0D%0A' + ''" class="btn btn-secondary w-full" @click="createInvoice">Send</a>
                    </div>
                    <div class="mt-2">
                        <a class="text-left btn btn-outline w-full" @click="createInvoice">@vuepic/vue-datepcker/dist/maicker/dist/maiicker/dist/main.css'</a>
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
const senderType = ref("")
const senderName = ref("")
const senderAddress = ref("")
const senderCity = ref("")
const senderCountry = ref("")
const recieverType = ref("")
const recieverName = ref("")
const recieverAddress = ref("")
const recieverCity = ref("")
const recieverCountry = ref("")
const invoiceCurrency = ref("")
let invoiceItems = []
const itemsForm = ref(null)
const formRow = ref( ['', '']) 

const addField = () => {
    formRow.value.push('');
}
const removeField = () => {
    formRow.value.pop()
}

let invoiceItemsNameArray = []
let invoiceItemsQuantityArray = []
let invoiceItemsRateArray = []
let invoiceItemsTaxArray = []
let invoiceItemsAmountArray = []
function getInvoiceItems() {
   // const invoiceItemsConverted
 //   if (itemsForm.value != null) {
        console.log(itemsForm);
        const formData = new FormData(itemsForm.value) 
        for (const [fieldName, fieldValue] of formData.entries()) {
              console.log(`${fieldName} :`, fieldValue)
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

        for(let itemIndex in invoiceItemsNameArray )
        {
            invoiceItems.push({
                'name':invoiceItemsNameArray[itemIndex], 
                'quantity':invoiceItemsQuantityArray[itemIndex], 
                'rate':invoiceItemsRateArray[itemIndex], 
                'tax':invoiceItemsTaxArray[itemIndex], 
                'amount':invoiceItemsAmountArray[itemIndex], 
            })

        }
        console.log(invoiceItems);
       

}

async function createInvoice() {

    let issueDateConverted = convertToSimpleDate(issueDate)
    let dueDateConverted = convertToSimpleDate(dueDate)
    console.log(issueDateConverted);
    console.log(dueDateConverted);
    getInvoiceItems();

    const { data, error } = await supabase
        .from('invoices')
        .insert([
            {
                number: invoiceNumber.value,
                issue_date:issueDate.value,
                due_date:dueDate.value,
            //    from_type: senderType.value,
            //    to_type: recieverType.value,
                from: senderEmail.value,
                to: recieverEmail.value,
                from_info: {'name': senderName.value, 'address': senderAddress.value, 'city': senderCity.value,'country': senderCountry.value },
                to_info: {'name': recieverName.value, 'address': recieverAddress.value, 'city': recieverCity.value,'country': recieverCountry.value },
                status: 'not_paid',
                currency: invoiceCurrency.value,
                items:invoiceItems
            },
        ])
        .select()
        console.log(error);
        console.log(data);
        itemsForm.value.reset()


}




</script>

<style scoped lang="scss">
.crypto-pay-profile-card {
    background-color: rgb(237, 238, 248);
    background-image: url(/assets/images/Crypto-Profile-Link.svg);
    background-position: 10px bottom;
    background-repeat: no-repeat;
    background-size: 140px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: rgb(222, 225, 245);
    }
}

.create-invoice-card {
    background-color: #e5eee9;
    background-image: url(/assets/images/Crypto-Invoice.svg);
    background-position: 10px bottom;
    background-repeat: no-repeat;
    background-size: 140px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #cbdad0;
    }
}

.crypto-wallet-input input {
    font-weight: 300;
}
</style>