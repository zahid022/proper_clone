<script setup lang="ts">
const props = defineProps<{
    stock : number,
    flag : boolean
}>()

const emit = defineEmits(['close-accordion', 'change-quantity'])

const handleChooseCount = (index : number) => {
    emit('close-accordion')
    emit('change-quantity', index)
}

</script>

<template>
    <div :class="{'!block' : flag}" class="absolute hidden top-full border-[#000] h-[80px] z-[999] element shadow-lg overflow-y-auto left-0 right-0">
        <div v-for="(_, index) in stock" :key="index" @click="() => handleChooseCount(index + 1)" class="bg-white p-2 border text-[12px]">
            {{ index + 1 }}
        </div>
    </div>
</template>

<style scoped>
.element::-webkit-scrollbar {
    display: none;
}
</style>