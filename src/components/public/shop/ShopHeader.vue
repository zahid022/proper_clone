<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
const props = defineProps<{
    name: string
}>()
</script>

<template>
    <section class="px-3 md:px-8 lg:px-12 py-4 md:pt-10">
        <div class="flex justify-between items-center">
            <div class="md:w-9/12">
                <h1 class="capitalize italic text-[20px] md:text-[32px] lg:text-[38px]">Men's {{ name }}</h1>
            </div>
            <div class="md:w-3/12">
                <button class="md:hidden">
                    <MagnifyingGlassIcon class="w-4 h-4 text-black" />
                </button>
                <input type="text" class="hidden md:block w-full bg-[#f4f4f4] text-[14px] placeholder:text-gray-600 px-3 py-2 rounded" placeholder="Search Products..." />
            </div>
        </div>
    </section>
</template>