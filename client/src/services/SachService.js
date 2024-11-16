import createAxios from "@/utils/axios";

const axios = createAxios("/Sach")
const axiosMultipartFormData = createAxios("/Sach", "multipart/form-data")
const sachService = {
    getAllSach: () => axios.get("/"),
    getAllSachByFilter: (filter) => axios.get("/search", {
        params: filter
    }),
    getPagesOfSach: (filter) => axios.get("/pages", {
        params: filter
    }),
    createSach: (sach) => axiosMultipartFormData.post("/create", sach),
    updateSach: (id, sach) => axiosMultipartFormData.patch(`/update/${id}`, sach),
    deleteSach: (id) => axios.delete(`/delete/${id}`),
    getNewMaSach: () => axios.get("/newMaSach"),
    getSachByMaSach: (maSach) => axios.get(`/searchByMaSach/${maSach}`),
    getSachById: (id) => axios.get(`/searchById/${id}`),
}

export default sachService