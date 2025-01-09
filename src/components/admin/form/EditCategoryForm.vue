<script setup lang="ts">
import { addCategory } from '@/stores/admin/category/addCategory';
import { editCategory } from '@/stores/admin/category/editCategory';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { Category } from '@/services/api'
import { ref, type Ref } from 'vue';
import type { updateCategoryType } from '@/types/database.type';

const toast = useToast()

const store = editCategory()

const { edit_category_id } = storeToRefs(store)

const { SET_EDIT_CATEGORY_ID, SET_EDIT_MODAL_FLAG } = store

const refetchStore = addCategory()

const { refetch } = storeToRefs(refetchStore)

const { SET_REFETCH } = refetchStore

const categoryName: Ref<string> = ref('')
const categoryOrder: Ref<number> = ref(0)

const handleEdit = async () => {
    if (edit_category_id.value === '') {
        toast.error("Category update is failed")
        return
    }

    const obj : updateCategoryType = {
        name : categoryName.value !== '' ? categoryName.value : undefined ,
        order : categoryOrder.value !== 0 ? categoryOrder.value : undefined
    }

    const result = await Category.update(edit_category_id.value, obj)
    
    if (!result) {
        toast.error("Category update is failed")
        return
    }

    toast.success("Category update is successfully")
    SET_EDIT_CATEGORY_ID('')
    SET_EDIT_MODAL_FLAG(false)
    SET_REFETCH(!refetch.value)
}

</script>

<template>
    <div>
        <div class="mb-4">
            <label for="name">Category name</label>
            <input type="text" v-model="categoryName" id="name" name="name" placeholder="Category name">
        </div>
        <div class="mb-4">
            <label for="order">Category order</label>
            <input type="number" v-model="categoryOrder" id="order" name="order" placeholder="Category order">
        </div>
        <div>
            <button @click="handleEdit" class="block w-full rounded-md py-3 bg-gray-500 text-white">
                Edit Category
            </button>
        </div>
    </div>
</template>


<style scoped>
label {
    display: block;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    padding-left: 10px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    outline: none;
}
</style>