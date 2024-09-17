<template>
    <div>
    <div class="flex flex-wrap justify-center bg-slate-600">
        <div class=" basis-full md:basis-8/12  p-3">
            
            <div class="bg-slate-100 max-w-full rounded-lg  p-4 md:p-8 m-2 ">

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

        </div>
        </div>

    </div>
</div>
</template>

<script
    setup
    lang="js"
>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import convertToSimpleDate from '~/utils';
const route = useRoute();

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


async function getInvoiceById(id){
    let { data , error } = await supabase
  .from('invoices')
  .select("*")
  // Filters
  .eq('invoice_uuid', id)
  console.log(error);
  console.log(data);
  if (data){
    invoiceNumber.value = data[0].number;
    senderEmail.value = data[0].from;
    recieverEmail.value = data[0].to;
    invoiceNumber.value = data[0].number;
  }
}

onMounted(()=>{
getInvoiceById(route.params.id)
})



</script>

<style scoped></style>