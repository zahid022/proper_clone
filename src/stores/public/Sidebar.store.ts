import { defineStore } from "pinia";

export const sidebarMenuTrigger = defineStore("sidebarMenuTrigger", {
    state: () => ({
        sidebar_flag : false
    }),
    actions: {
        SET_SIDEBAR_FLAG(arg: boolean) {
            this.sidebar_flag = arg
        }
    },
});
