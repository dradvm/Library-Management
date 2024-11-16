import createAxios from "@/utils/axios";

const axios = createAxios("/Auth")

const authService = {
    loginEmployee: (userLogin) => axios.post("/loginEmployee", userLogin),
    login: (userLogin) => axios.post("/login", userLogin),
    register: (docGia) => axios.post("/register", docGia)
}

export default authService