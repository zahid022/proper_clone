import { defineStore } from "pinia";

export const addProduct = defineStore("addProduct", {
    state: () => ({ add_ProductCheck: false, refetch : false}),
    actions: {
        SET_PRODUCT_CHECK(arg: boolean) {
            this.add_ProductCheck = arg
        },
        SET_REFETCH(arg: boolean) {
            this.refetch = arg
        }
    }
})