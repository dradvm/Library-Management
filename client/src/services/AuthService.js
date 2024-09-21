import createAxios from "@/utils/axios";

const axios = createAxios("/Auth")

const authService = {
    login: (userLogin) => axios.post("/login", userLogin),
}

export default authService