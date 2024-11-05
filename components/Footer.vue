<template>
    <div class=" border-t py-3">
        <div class="md:container md:mx-auto ">
            <div class="flex flex-wrap items-center mx-3">
                <div class="basis-full md:basis-1/2">
                    <div class="flex align-middle gap-2">
                        <div class="text-xl text-slate-700">Linkvoices</div>
                        <div>
                            <github-button 
                                class="mt-1" 
                                href="https://github.com/babakzy/linkvoices"
                                data-color-scheme="no-preference: light; light: light; dark: light;" 
                                data-icon="octicon-star"
                                data-size="large" 
                                aria-label="Star babakzy/linkvoices on GitHub">
                                Star
                            </github-button>
                        </div>
                    </div>
                </div>
                <div class="basis-full md:basis-1/2 md:text-right"><a
                        href="mailto:babak@linkvoices.com">babak@linkvoices.com</a></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import GithubButton from 'vue-github-button'
</script>

<style scoped></style>