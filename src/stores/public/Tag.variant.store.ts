import type { ProductVariant } from "@/types/database.type";
import { defineStore } from "pinia";

export const tagVariant = defineStore("tagVariant", {
    state: () => ({
        checkVariants: [] as ProductVariant[],     
    }),
    actions: {
        SET_CHECK_VARIANTS(arg: ProductVariant) {
            this.checkVariants.push(arg);
        },
        CLEAR_CHECK_VARIANTS(){
            this.checkVariants = []
        }
    },
});
