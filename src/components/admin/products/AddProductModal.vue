<script setup lang="ts">
import { addProduct } from '@/stores/admin/product/AddProduct';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import AddProductForm from '@/components/admin/form/AddProductForm.vue'

const addProductStore = addProduct()

const { add_ProductCheck } = storeToRefs(addProductStore)

const { SET_PRODUCT_CHECK } = addProductStore

</script>

<template>
    <div :class="{ 'visible z-[999] opacity-100': add_ProductCheck, 'invisible z-[-1] opacity-0': !add_ProductCheck }"
        class="fixed flex justify-center items-center inset-0 duration-300 bg-[#00000080]">
        <div :class="{ 'translate-y-0': add_ProductCheck, '-translate-y-10': !add_ProductCheck }"
            class="bg-slate-800 max-w-xl rounded-md w-full py-3 px-4 duration-300">
            <div>
                <div class="flex justify-between border-b pb-3 mb-3 border-gray-500 items-center">
                    <h2 class="text-white text-xl">Add Product</h2>
                    <button @click="() => SET_PRODUCT_CHECK(false)">
                        <XMarkIcon class="h-6 w-6 text-white" />
                    </button>
                </div>
                <div class="max-h-[600px] element overflow-y-auto">
                    <AddProductForm />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.element::-webkit-scrollbar {
    width: 0;
}
</style>