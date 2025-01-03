<script setup lang="ts">
import { addCategory } from '@/stores/admin/category/addCategory';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import AddCategoryForm from '../form/AddCategoryForm.vue';

const store = addCategory()

const { isModalOpen } = storeToRefs(store)

const { SET_IS_MODAL_OPEN } = store
</script>

<template>
    <div class="duration-300 fixed bg-[#00000080] inset-0 flex justify-center items-center z-[999]"
        :class="{ 'invisible opacity-0': !isModalOpen, 'visible opacity100': isModalOpen }">
        <div class="duration-300 max-w-md bg-gray-700 p-3 rounded-md relative w-full" :class="{'translate-y-0' : isModalOpen, 'translate-y-[-100%]' : !isModalOpen}">
            <div class="relative border-b pb-2">
                <p class="text-gray-50 text-[18px] font-medium">Add Category</p>
                <button @click="() => SET_IS_MODAL_OPEN(false)" class="absolute top-[50%] right-0 translate-y-[-50%]">
                    <XMarkIcon class="w-6 h-6 text-gray-50" />
                </button>
            </div>
            <div>
                <AddCategoryForm />
            </div>
        </div>
    </div>
</template>