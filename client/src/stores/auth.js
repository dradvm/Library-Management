import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
        user: null
    }),
    actions: {
        login(accessToken) {
            this.isAuthenticated = true
            this.user = accessToken
        },
        logout() {
            this.isAuthenticated = false
            this.user = null
        }
    }
})