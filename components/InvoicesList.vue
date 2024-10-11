<template>
    <div>
        <h2 class="text-2xl font-normal text-slate-700 my-4">Last Invoices</h2>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Row</th>
                        <th>Created At</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(invoiceItem, index) in currentUserInvoices" v-bind:key="index">
                        <th >{{ index+1 }}</th>
                        <td>{{ convertToSimpleDate(invoiceItem.created_at) }}</td>
                        <td >{{ invoiceItem.from }}</td>
                        <td><b>{{ invoiceItem.to }}</b></td>
                        <td>{{ invoiceItem.status }}</td>
                        <td>{{ invoiceItem.id }}</td>                  
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import convertToSimpleDate from '~/utils';
const supabase = useSupabaseClient()
const currentUserInvoices = ref([])
const user = useSupabaseUser()
onMounted(() => {
    readInvoices();
    console.log(user.value.id);
})

async function readInvoices() {
    let { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user.value.id)
    currentUserInvoices.value=invoices;
}

</script>

<style scoped></style>