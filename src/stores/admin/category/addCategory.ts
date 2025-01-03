import { defineStore } from "pinia";

export const addCategory = defineStore("addCategory", {
    state: () => ({
        refetch: false,
        parentId : '',
        isModalOpen : false
    }),
    actions: {
        SET_REFETCH(arg: boolean) {
            this.refetch = arg
        },
        SET_PARENT_ID(arg : string) {
            this.parentId = arg
        },
        SET_IS_MODAL_OPEN(arg: boolean){
            this.isModalOpen = arg
        }
    }
})