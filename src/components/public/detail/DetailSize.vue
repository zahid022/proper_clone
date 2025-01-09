<script setup lang="ts">
import type { ProductVariant, specValue } from '@/types/database.type';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
    size: specValue,
    color: string,
    variants: ProductVariant[],
    currentSize : string
}>()


const emit = defineEmits(["check-variant"])

const flag = ref(false)

const getData = () => {
    flag.value = props.variants.some((item: ProductVariant) => item.specs.size === props.size.key)
}

const chooseVariant = () => {
    emit('check-variant', props.size.key)
}

onMounted(() => getData())

watch(() => props.variants, () => getData())

</script>

<template>
    <button :disabled="!flag"
        :class="{' bg-gray-100 !border-gray-300  cursor-not-allowed' : !flag, '!bg-black !text-white' : size.key === props.currentSize}"
        @click="chooseVariant"
        class="flex items-center justify-center border border-[#888] w-11 h-11 p-[3px] cursor-pointer rounded">
        {{ size.value }}
        
    </button>
</template>