<script setup lang="ts">
const props = defineProps<{
    index: number,
    quantity: number
}>()


const emit = defineEmits(['choose-count', 'toggle-accordion'])

const chooseQuantity = () => {
    emit('choose-count', (props.index + 1))
    emit('toggle-accordion', false)
}
</script>

<template>
    <div @click="chooseQuantity" class="w-full bg-white border h-[40px] border-b flex items-center pl-4"
        :class="{ '!bg-black text-white !border-black': (index + 1) === quantity }">
        {{ index + 1 }}
    </div>
</template>

<style scoped></style>