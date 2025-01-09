import type { basketType } from "@/types/cart.types";
import { defineStore } from "pinia";

export const cartStore = defineStore("cartStore", {
    state: () => ({
        basket: {
            list: [],
            totalDiscount: 0,
            totalPrice: 0,
          } as basketType,
        refetch_basket : false
    }),
    actions: {
        SET_BASKET(arg: basketType) {
            this.basket = arg
        },
        SET_REFETCH_BASKET(arg : boolean){
            this.refetch_basket = arg
        }
    },
});
