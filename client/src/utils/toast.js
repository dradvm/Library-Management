import { toast } from 'vue3-toastify';
const myToast = (message = "", type = "error", autoClose = 2000, onClose = () => { }) => {
    toast(message, {
        type,
        autoClose,
        onClose
    })
}

export default myToast