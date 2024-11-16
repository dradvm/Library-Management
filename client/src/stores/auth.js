import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
        user: null,
        cart: []
    }),
    actions: {
        async login(accessToken) {
            this.isAuthenticated = true
            this.user = jwtDecode(accessToken)
        },
        async logout() {
            localStorage.removeItem("accessToken");
            this.isAuthenticated = false
            this.user = null
            this.cart = []
        },
        getCart() {
            return this.cart
        },
        clearCart() {
            this.cart = []
        },
        isLogined() {
            return !!this.user
        },
        getId() {
            return this.user.id
        },
        getTen() {
            return this.user.ten
        },
        addBookCart(book) {
            this.cart.push(book)
        },
        removeBookCart(index) {
            this.cart.splice(index, 1)
        },
        isExistBook(book) {
            var check = false
            this.cart.forEach((sach) => {
                if (sach._id === book._id) {
                    check = true
                }
            })
            return check
        }
    }
})