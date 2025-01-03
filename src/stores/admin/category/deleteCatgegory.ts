import { defineStore } from "pinia";

export const deleteCategory = defineStore("deleteCategory", {
    state: () => ({
        modal_flag : false,
        delete_category_id : ''
    }),
    actions: {
        SET_MODAL_FLAG(arg : boolean){
            this.modal_flag = arg
        },
        SET_DELETE_CATEGORY_ID(arg : string){
            this.delete_category_id = arg
        }
    }
})