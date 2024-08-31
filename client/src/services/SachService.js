import createAxios from "@/utils/axios";

const axios = createAxios("/Sach")
const axiosMultipartFormData = createAxios("/Sach", "multipart/form-data")


const sachService = {
    getAllSach: () => axios.get("/"),
    createSach: (sach) => axiosMultipartFormData.post("/create", sach),
    updateSach: (id, sach) => axiosMultipartFormData.patch(`/update/${id}`, sach),
    getNewMaSach: () => axios.get("/newMaSach"),
    getSachByMaSach: (maSach) => axios.get(`/searchByMaSach/${maSach}`)
}

export default sachService