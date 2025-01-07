<script setup lang="ts">

</script>

<template>
    <main>
        <section class="px-3 md:px-8 min-h-[81vh] lg:px-12 py-5">
            <div class="flex flex-wrap md:justify-between">
                <ul class="flex md:flex-col w-full md:w-2/12 md:pt-12 mb-4 md:mb-0 gap-3 items-center md:items-start">
                    <li class="text-[#757575] hover:underline">
                        <RouterLink to="/account">Account</RouterLink>
                    </li>
                    <li class="text-[#757575] hover:underline">
                        <RouterLink to="/account/orders">Orders</RouterLink>
                    </li>
                </ul>
                <div class="w-full md:w-9/12">
                    <RouterView></RouterView>
                </div>
            </div>
        </section>
    </main>
</template>