import { defineStore } from "pinia";

export const tagVariant = defineStore("tagVariant", {
    state: () => ({
        checkVariants: [] as any[],     
    }),
    actions: {
        SET_CHECK_VARIANTS(arg: any) {
            this.checkVariants.push(arg);
        },
        CLEAR_CHECK_VARIANTS(){
            this.checkVariants = []
        }
    },
});
