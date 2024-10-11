import { createRouter, createWebHistory } from "vue-router"
import LoginPage from "@views/LoginPage.vue"
import HomeLayout from "@views/HomeLayout.vue"
import BookPage from "@views/BookPage.vue"
import AddAndUpdateBook from "@/views/AddAndUpdateBook.vue"
import EmployeePage from "@/views/EmployeePage.vue"
import { useAuthStore } from "@/stores/auth"
import AddAndUpdateEmployee from "@/views/AddAndUpdateEmployee.vue"
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
            redirect: "/Book",
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
                    path: "UpdateEmployee",
                    name: "UpdateEmployeePage",
                    component: AddAndUpdateEmployee
                }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/Book"
        }
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
