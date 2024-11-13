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
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/Manager",
            component: null,
            children: [
                {
                    path: "Login",
                    name: "LoginManagerPage",
                    component: LoginManagerPage
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
                        }
                    ]
                },
            ]
        },
        {
            path: "/LoginPage",
            name: "LoginPage",
            component: LoginPage
        },
        {
            path: "/RegisterPage",
            name: "RegisterPage",
            component: RegisterPage
        },
        {
            path: "/",
            component: HomeLayout,
            children: [
                {
                    path: "",
                    name: "HomePage",
                    component: HomePage
                },
                {
                    path: "Discover",
                    name: "DiscoverBookPage",
                    component: DiscoverBookPage,
                    props: true
                },
                {
                    path: "BookDetail/:maSach",
                    name: "BookDetailPage",
                    component: BookDetailPage
                }

            ]
        },
        // {
        //     path: "/:pathMatch(.*)*",
        //     redirect: "/Manager/Book"
        // }
    ]
})

// router.beforeEach((to, from, next) => {
//     if (!localStorage.getItem("accessToken") && to.path != "/Login") {
//         next({ path: "/Login" })
//     }
//     else {
//         next()
//     }
// })


export default router
