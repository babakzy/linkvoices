<template>
    <div class="py-20">
        <h1 class="text-4xl text-blue-900">Nuxt 3 Minimal Boilerplate</h1>
        <div class="flex flex-wrap mt-8">
            <div class="basis-1/6">
                <div class=" bg-blue-100 rounded-lg p-4 m-2">
                    <h3>TailwindCSS</h3>
                </div>
            </div>
            <div class="basis-1/6">
                <div class=" bg-blue-100 rounded-lg p-4 m-2">
                    <h3>DaisyUI</h3>
                    <p class="text-slate-500 font-thin">Theme: Winter</p>
                </div>
            </div>
            <div class="basis-1/6">
                <div class=" bg-blue-100 rounded-lg p-4 m-2">
                    <h3>Google Font</h3>
                    <p class="text-slate-500 font-thin">Font: Play</p>
                </div>
            </div>
            <div class="basis-1/6">
                <div class=" bg-blue-100 rounded-lg p-4 m-2">
                    <h3>Nuxt Structure</h3>
                    <p class="text-slate-500 font-thin">Layouts, Pages, Components, Composables</p>
                </div>
            </div>
        </div>
        <div class="py-6">
            <button class="btn mr-3 btn-primary" @click="createInvoice">Create</button>
            <button class=" btn btn-secondary" @click="readInvoices">Read Invoices</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function createInvoice() {

    const { data, error } = await supabase
        .from('invoices')
        .insert([
            { number: 1, from_type: 'company1', to_type: 'personal', from: 'UserMe', to: 'Pex', from_info: { 'property': 'value example' } },
        ])

    console.log(error);
    console.log(data);

}

async function readInvoices() {

    let { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')

    console.log(error);
    console.log(invoices);

}


</script>

<style scoped></style>