<script setup lang="ts">
import { addVariant } from '@/stores/admin/product/AddVariant';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import AddVariantForm from '../form/AddVariantForm.vue';



const addVariantStore = addVariant()

const { add_modalCheck } = storeToRefs(addVariantStore)

const { SET_MODAL_CHECK } = addVariantStore
</script>

<template>
    <div :class="{ 'visible z-[999] opacity-100': add_modalCheck, 'invisible z-[-1] opacity-0': !add_modalCheck }"
        class="fixed flex justify-center items-center inset-0 duration-300 bg-[#00000080]">
        <div :class="{ 'translate-y-0': add_modalCheck, '-translate-y-10': !add_modalCheck }"
            class="bg-slate-800 max-w-2xl rounded-md w-full py-3 px-4 duration-300">
            <div>
                <div class="flex justify-between border-b pb-3 mb-3 border-gray-500 items-center">
                    <h2 class="text-white text-xl">Add Variant</h2>
                    <button @click="() => SET_MODAL_CHECK(false)">
                        <XMarkIcon class="h-6 w-6 text-white" />
                    </button>
                </div>
                <div>
                    <AddVariantForm />
                </div>
            </div>
        </div>
    </div>
</template>