import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import router from '../router'

const createAxios = (route = "", contentType = 'application/json') => {
    const instance = axios.create({
        baseURL: `/api${route}`,
        timeout: 10000,
        headers: {
            'Content-Type': contentType
        }
    })
    instance.interceptors.request.use((config) => {
        if (localStorage.getItem("accessToken")) {

            config.headers['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
        }
        return config
    }, (err) => {
        return Promise.reject(err)
    })
    instance.interceptors.response.use((response) => {
        if (response.headers.newaccesstoken) {
            localStorage.setItem("accessToken", response.headers.newaccesstoken)
        }
        return response
    }, (err) => {
        if (err.response.status >= 400 && err.response.status < 500) {
            if (err.response && err.response.status === 440) {
                router.push({ name: "LoginPage" })
                return
            }
            return Promise.resolve(err.response)
        }
        return Promise.reject(err)
    })
    return instance
}
export default createAxios