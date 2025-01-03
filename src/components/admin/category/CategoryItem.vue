<script setup lang="ts">
import { addCategory } from '@/stores/admin/category/addCategory';
import { deleteCategory } from '@/stores/admin/category/deleteCatgegory';
import { editCategory } from '@/stores/admin/category/editCategory';
import type { category } from '@/types/database.type';

const props = defineProps<{
    categoryElement: category
}>()

const store = addCategory()

const { SET_IS_MODAL_OPEN, SET_PARENT_ID } = store

const deleteStore = deleteCategory()

const { SET_DELETE_CATEGORY_ID, SET_MODAL_FLAG } = deleteStore

const editStore = editCategory()

const { SET_EDIT_CATEGORY_ID, SET_EDIT_MODAL_FLAG } = editStore

const handleDelete = (id: string) => {
    SET_DELETE_CATEGORY_ID(id)
    SET_MODAL_FLAG(true)
}

const handleAddCategory = () => {
    SET_IS_MODAL_OPEN(true)
    SET_PARENT_ID(props.categoryElement._id as string)
}

const handleEditCategory = () => {
    SET_EDIT_CATEGORY_ID(props.categoryElement._id as string)
    SET_EDIT_MODAL_FLAG(true)
}

</script>

<template>
    <div class="mb-3">
        <div class="p-3 mb-4 bg-gray-700 flex items-center justify-between text-white rounded-md">
            <div class="w-5/12 flex items-center justify-between">
                <p> {{ categoryElement.name }}</p>
                <p>Order : {{ categoryElement.order }}</p>
            </div>
            <div class="flex w-5/12 justify-end gap-4">
                <button @click="handleAddCategory" class="bg-gray-500 px-3 py-1 rounded-md">Add Child</button>
                <button @click="handleEditCategory" class="bg-lime-600 px-3 py-1 rounded-md">Edit</button>
                <button @click="() => handleDelete(categoryElement._id as string)"
                    class="bg-red-600 px-3 py-1 rounded-md">Delete</button>
            </div>
        </div>
        <div v-if="categoryElement.children?.length" class="pl-5 mt-2">
            <CategoryItem v-for="child in categoryElement.children" :key="child._id" :categoryElement="child" />
        </div>
    </div>
</template>