import type { User } from "@/types/user.type";
import { defineStore } from "pinia";

export const getUser = defineStore("getUser", {
    state: () => ({
        user : {} as any,
        token : ''
    }),
    actions: {
        SET_USER(arg: User | {}) {
            this.user = arg
        },
        SET_TOKEN(arg : string) {
            this.token = arg
        },
        SIGN_OUT(){
            this.user = {}
            this.token = ''
            localStorage.removeItem("token")
        }
    }
})