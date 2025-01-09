import { defineStore } from "pinia";

export const cartStore = defineStore("cartStore", {
    state: () => ({
        basket : {} as any,
        refetch_basket : false
    }),
    actions: {
        SET_BASKET(arg: any) {
            this.basket = arg
        },
        SET_REFETCH_BASKET(arg : boolean){
            this.refetch_basket = arg
        }
    },
});
