<script setup lang="ts">
import { editCategory } from '@/stores/admin/category/editCategory';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import EditCategoryForm from '@/components/admin/form/EditCategoryForm.vue'

const editStore = editCategory()

const { edit_modal_flag } = storeToRefs(editStore)

const { SET_EDIT_MODAL_FLAG, SET_EDIT_CATEGORY_ID } = editStore

const handleCloseModal = () => {
    SET_EDIT_CATEGORY_ID('')
    SET_EDIT_MODAL_FLAG(false)
}
</script>

<template>
    <div class="fixed inset-0 duration-300 z-[999] bg-[#00000080] flex justify-center items-center"
        :class="{ 'visible opacity-100': edit_modal_flag, 'invisible opacity-0': !edit_modal_flag }">
        <div class="bg-gray-600 p-3 rounded-md duration-300 max-w-md w-full"
            :class="{ 'translate-y-0': edit_modal_flag, 'translate-y-[-100%]': !edit_modal_flag }">
            <div class="border-b pb-2 flex items-center justify-between">
                <p class="text-gray-50 text-[18px] font-medium">Edit Category</p>
                <button @click="handleCloseModal">
                    <XMarkIcon class="w-6 h-6 text-gray-50" />
                </button>
            </div>
            <div class="py-2">
                <EditCategoryForm />
            </div>
        </div>
    </div>
</template>