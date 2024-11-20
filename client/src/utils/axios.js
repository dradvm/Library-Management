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
        const currentMeta = router.currentRoute.value.meta

        if (currentMeta.isManager) {
            config.headers['isManager'] = true
        }
        else {
            config.headers['isManager'] = false
        }
        if (currentMeta.notLogin) {
            config.headers['notLogin'] = true
        }
        else {
            config.headers['notLogin'] = false
        }

        if (localStorage.getItem("accessToken")) {

            config.headers['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
        }
        console.log(config.headers)
        return config
    }, (err) => {
        return Promise.reject(err)
    })
    instance.interceptors.response.use((response) => {
        if (response.headers.newaccesstoken && response.headers.newaccesstoken != "null") {
            localStorage.setItem("accessToken", response.headers.newaccesstoken)
        }
        return response
    }, (err) => {
        if (err.response.status >= 400 && err.response.status < 500) {
            if (err.response && err.response.status === 440) {
                localStorage.removeItem("accessToken")
                router.push({ name: "" })
                return
            }
            return Promise.resolve(err.response)
        }
        return Promise.reject(err)
    })
    return instance
}
export default createAxios