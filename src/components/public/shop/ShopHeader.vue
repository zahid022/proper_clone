<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps<{
    name: string
}>()

const route = useRoute()

const value : Ref<string> = ref('')

const getValue = () => {
    if(route.query.q){
        value.value = route.query.q as string
        return
    }
    value.value = ''
}

onMounted(() => getValue())
watch(() => route.query, () => getValue())

</script>

<template>
    <section class="px-3 md:px-8 lg:px-12 py-4 md:pt-10">
        <div class="flex justify-between items-center">
            <div class="md:w-9/12">
                <h1 v-if="route.query.q" class="capitalize italic text-[20px] md:text-[32px] lg:text-[38px]">{{ name }}</h1>
                <h1 v-else class="capitalize italic text-[20px] md:text-[32px] lg:text-[38px]">Men's {{ name }}</h1>
            </div>
            <div class="md:w-3/12">
                <button class="md:hidden">
                    <MagnifyingGlassIcon class="w-4 h-4 text-black" />
                </button>
                <input type="text" v-model="value" class="hidden md:block w-full bg-[#f4f4f4] text-[14px] placeholder:text-gray-600 px-3 py-2 rounded" placeholder="Search Products..." />
            </div>
        </div>
    </section>
</template>