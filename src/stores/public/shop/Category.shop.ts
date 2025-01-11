import type { category } from "@/types/database.type";
import { defineStore } from "pinia";

export const categoryShop = defineStore("categoryShop", {
    state: () => ({
        shopCategories : [] as category[]
    }),
    actions: {
        SET_SHOP_CATEGORIES(arg: category[]) {
            this.shopCategories = arg
        }
    },
});
