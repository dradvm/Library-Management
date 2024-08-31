import { createRouter, createWebHistory } from "vue-router"
import LoginPage from "@views/LoginPage.vue"
import HomeLayout from "@views/HomeLayout.vue"
import BookPage from "@views/BookPage.vue"
import AddAndUpdateBook from "@/views/AddAndUpdateBook.vue"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "IndexPage",
            component: LoginPage
        },
        {
            path: "/Login",
            name: "LoginPage",
            component: LoginPage
        },
        {
            path: "/Home",
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
                }
            ]
        }
    ]
})

export default router
