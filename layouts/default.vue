<template>
    <div>
        <Header />
        <div class="md:container md:mx-auto">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<style>
.content-section {
    min-height: 100vh;
}
</style>