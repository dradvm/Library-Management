import { createRouter, createWebHistory } from "vue-router"
import HomeManagerLayout from "@views/HomeManagerLayout.vue"
import BookPage from "@views/BookPage.vue"
import AddAndUpdateBook from "@/views/AddAndUpdateBook.vue"
import EmployeePage from "@/views/EmployeePage.vue"
import { useAuthStore } from "@/stores/auth"
import AddAndUpdateEmployee from "@/views/AddAndUpdateEmployee.vue"
import PublisherPage from "@/views/PublisherPage.vue"
import HomeLayout from "@/views/HomeLayout.vue"
import HomePage from "@/views/HomePage.vue"
import LoginPage from "@/views/LoginPage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import LoginManagerPage from "@/views/LoginManagerPage.vue"
import DiscoverBookPage from "@/views/DiscoverBookPage.vue"
import BookDetailPage from "@/views/BookDetailPage.vue"
import CartBookPage from "@/views/CartBookPage.vue"
import { jwtDecode } from "jwt-decode"
import OrderPage from "@/views/OrderPage.vue"
import ConfirmOrderPage from "@/views/ConfirmOrderPage.vue"
import HistoryOrderPage from "@/views/HistoryOrderPage.vue"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/Manager",
            component: null,
            meta: {
                isManager: true
            },
            children: [
                {
                    path: "Login",
                    name: "LoginManagerPage",
                    component: LoginManagerPage,
                    meta: {
                        notLogin: true
                    }
                },
                {
                    path: "",
                    name: "HomeManagerLayout",
                    component: HomeManagerLayout,
                    children: [
                        {
                            path: "Book",
                            name: "BookPage",
                            component: BookPage
                        },
                        {
                            path: "AddBook",
                            name: "AddBookPage",
                            component: AddAndUpdateBook
                        },
                        {
                            path: "UpdateBook/:maSach",
                            name: "UpdateBookPage",
                            component: AddAndUpdateBook
                        },
                        {
                            path: "Employee",
                            name: "EmployeePage",
                            component: EmployeePage
                        },
                        {
                            path: "AddEmployee",
                            name: "AddEmployeePage",
                            component: AddAndUpdateEmployee
                        },

                        {
                            path: "UpdateEmployee/:msNV",
                            name: "UpdateEmployeePage",
                            component: AddAndUpdateEmployee
                        },
                        {
                            path: "Publisher",
                            name: "PublisherPage",
                            component: PublisherPage
                        },
                        {
                            path: "Order",
                            name: "OrderPage",
                            component: OrderPage
                        },
                        {
                            path: "ConfirmOrder",
                            name: "ConfirmOrderPage",
                            component: ConfirmOrderPage
                        }
                    ]
                },
            ]
        },
        {
            path: "/LoginPage",
            name: "LoginPage",
            component: LoginPage,
            meta: {
                notLogin: true
            }
        },
        {
            path: "/RegisterPage",
            name: "RegisterPage",
            component: RegisterPage,
            meta: {
                notLogin: true
            }
        },
        {
            path: "/",
            component: HomeLayout,
            children: [
                {
                    path: "",
                    name: "HomePage",
                    component: HomePage,
                    meta: {
                        notLogin: true
                    }
                },
                {
                    path: "Discover",
                    name: "DiscoverBookPage",
                    component: DiscoverBookPage,
                    props: true,
                    meta: {
                        notLogin: true
                    }
                },
                {
                    path: "Cart",
                    name: "CartBookPage",
                    component: CartBookPage,
                    props: true
                },
                {
                    path: "History",
                    name: "HistoryOrderPage",
                    component: HistoryOrderPage,
                },
                {
                    path: "BookDetail/:maSach",
                    name: "BookDetailPage",
                    component: BookDetailPage,
                    meta: {
                        notLogin: true
                    }
                }

            ]
        },
        // {
        //     path: "/:pathMatch(.*)*",
        //     redirect: "/Manager/Book"
        // }
    ]
})

router.beforeEach((to, from, next) => {
    const user = localStorage.getItem("accessToken")
    const authStore = useAuthStore()
    if (user) {
        var userDecode = jwtDecode(user)
        authStore.login(user)
        if (["LoginPage", "RegisterPage", "LoginManagerPage"].includes(to.name)) {
            if (to.meta.isManager) {
                router.push({ name: "BookPage" })
            }
            else {
                router.push({ name: "HomePage" })
            }
        }
        else {
            if (to.meta.isManager && userDecode.isManager) {
                next()
            }
            else if (!to.meta.isManager && !userDecode.isManager) {
                next()
            }
            else {
                if (userDecode.isManager) {
                    router.push({ name: "BookPage" })
                }
                else {
                    router.push({ name: "HomePage" })
                }
            }
        }
    }
    else {
        if (to.meta.notLogin) {
            next()
        }
        else {
            if (to.meta.isManager) {
                router.push({ name: "LoginManagerPage" })
            }
            else {
                router.push({ name: "LoginPage" })
            }
        }
    }

})

export default router
