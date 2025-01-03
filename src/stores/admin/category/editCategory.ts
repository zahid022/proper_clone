import { defineStore } from "pinia";

export const editCategory = defineStore("editCategory", {
    state: () => ({
        edit_modal_flag : false,
        edit_category_id : ''
    }),
    actions: {
        SET_EDIT_MODAL_FLAG(arg : boolean){
            this.edit_modal_flag = arg
        },
        SET_EDIT_CATEGORY_ID(arg : string){
            this.edit_category_id = arg
        }
    }
})