import { createRouter, createWebHistory } from "vue-router"
import LoginPage from "@views/LoginPage.vue"
import HomeLayout from "@views/HomeLayout.vue"
import BookPage from "@views/BookPage.vue"
import AddAndUpdateBook from "@/views/AddAndUpdateBook.vue"
import EmployeePage from "@/views/EmployeePage.vue"
import { useAuthStore } from "@/stores/auth"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/Login",
            name: "LoginPage",
            component: LoginPage
        },
        {
            path: "/",
            name: "HomeLayout",
            component: HomeLayout,
            children: [
                {
                    path: "Book",
                    name: "BookPage",
                    component: BookPage
                },
                {
                    path: "AddBook",
                    name: "AddBook",
                    component: AddAndUpdateBook
                },
                {
                    path: "UpdateBook/:maSach",
                    name: "UpdateBook",
                    component: AddAndUpdateBook
                },
                {
                    path: "Employee",
                    name: "EmployeePage",
                    component: EmployeePage
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated && to.path != "/Login") {
        next({ path: "/Login" })
    }
    else {
        next()
    }
})


export default router
