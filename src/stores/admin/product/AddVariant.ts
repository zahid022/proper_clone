import type { ProductType } from "@/types/database.type";
import { defineStore } from "pinia";

export const addVariant = defineStore("addVariant", {
    state: () => ({ add_modalCheck: false, current_product : null as ProductType | null }),
    actions: {
        SET_MODAL_CHECK(arg: boolean) {
            this.add_modalCheck = arg
        },
        SET_CURRENT_PRODUCT(arg : ProductType){
            this.current_product = arg
        }
    }
})