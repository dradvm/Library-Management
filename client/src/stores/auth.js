import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
        user: null
    }),
    actions: {
        async login(accessToken) {
            localStorage.setItem("accessToken", accessToken);
            this.isAuthenticated = true
            this.user = accessToken
        },
        async logout() {
            localStorage.removeItem("accessToken");
            this.isAuthenticated = false
            this.user = null
        }
    }
})