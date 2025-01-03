<script setup lang="ts">
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
    item: boolean,
    productId: string
}>()

const emit = defineEmits(['confirm', 'closeModal'])

const confirmDelete = () => {
    emit('confirm', props.productId)
}

</script>

<template>
    <div class="fixed inset-0 bg-[#00000080] z-[999] flex items-center justify-center duration-300"
        :class="{ 'opacity-100 visible': item, 'opacity-0 invisible': !item }">
        <div :class="{ 'translate-y-0': item, 'translate-y-[-100%]': !item }"
            class="max-w-md duration-300 bg-gray-700 rounded-md px-3 w-full pt-3">
            <div class="flex justify-end">
                <button @click="$emit('closeModal')">
                    <XMarkIcon class="w-6 h-6 text-gray-50" />
                </button>
            </div>
            <div class="flex justify-center">
                <ExclamationTriangleIcon class="w-20 h-20 text-white" />
            </div>
            <div class="mb-4">
                <p class="text-center text-gray-50 text-[24px]">Are you sure?</p>
            </div>
            <div class="flex justify-between py-3">
                <button @click="$emit('closeModal')"
                    class="block w-5/12 py-2 text-gray-50 rounded-md bg-red-600">No</button>
                <button @click="confirmDelete"
                    class="block w-5/12 py-2 text-gray-50 rounded-md bg-lime-600">Yes</button>
            </div>
        </div>
    </div>
</template>