<script setup lang="ts">
import { Category } from '@/services/api';
import type { category } from '@/types/database.type';
import { onMounted, ref, watch, type Ref } from 'vue';
import CategoryItem from '@/components/admin/category/CategoryItem.vue'
import CategoryAddModal from '@/components/admin/category/CategoryAddModal.vue'
import { addCategory } from '@/stores/admin/category/addCategory';
import { storeToRefs } from 'pinia';
import { deleteCategory } from '@/stores/admin/category/deleteCatgegory';
import DeleteModal from '@/components/admin/delete_confirm/DeleteModal.vue';
import { useToast } from 'vue-toastification';
import CategoryEditModal from '@/components/admin/category/CategoryEditModal.vue';

const toast = useToast()

const store = addCategory()

const { refetch } = storeToRefs(store)

const { SET_IS_MODAL_OPEN, SET_PARENT_ID , SET_REFETCH} = store

const deleteStore = deleteCategory()

const { delete_category_id, modal_flag } = storeToRefs(deleteStore)

const { SET_MODAL_FLAG, SET_DELETE_CATEGORY_ID } = deleteStore

const closeDeleteModal = () => {
    SET_MODAL_FLAG(false)
}

const handleDeleteCategory = async () => {
    const result = await Category.deleteCategory(delete_category_id.value)

    if (!result) {
        toast.error("Category deleted is failed")
        return
    }

    toast.success("Category is deleted successfully")
    SET_REFETCH(!refetch.value)
    SET_MODAL_FLAG(false)
    SET_DELETE_CATEGORY_ID('')
}

const data: Ref<category[]> = ref([])

const getData = async () => {
    const result = await Category.nested()

    data.value = result
}

const handleAddCategory = () => {
    SET_IS_MODAL_OPEN(true)
    SET_PARENT_ID('')
}

onMounted(() => {
    getData()
})

watch(() => refetch.value, () => getData())
</script>

<template>
    <CategoryEditModal />
    <DeleteModal @close-modal="closeDeleteModal" @confirm="handleDeleteCategory" :item="modal_flag"
        :product-id="delete_category_id" />
    <CategoryAddModal />
    <main class="min-h-[91.8vh] p-5 h-full bg-gray-800">
        <div class="relative z-[900]">
            <button @click="handleAddCategory"
                class="absolute top-0 right-2 bg-lime-600 text-gray-50 px-6 py-3 rounded-md">
                Add Parent Category
            </button>
            <h1 class="text-3xl mb-5 text-center text-white">All Category</h1>
        </div>
        <div class="max-w-3xl mx-auto pt-8">
            <template v-if="data.length > 0">
                <CategoryItem v-for="category in data" :categoryElement="category" :key="category._id" />
            </template>
        </div>
    </main>
</template>