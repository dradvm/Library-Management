import createAxios from "@/utils/axios";

const axios = createAxios("/DocGia")
const docGiaService = {
    getAllDocGia: () => axios.get("/"),
    getAllDocGiaByFilter: (filter) => axios.get("/search", {
        params: filter
    }),
    getPagesOfDocGia: (filter) => axios.get("/pages", {
        params: filter
    }),
    createDocGia: (docGia) => axiosMultipartFormData.post("/create", docGia),
    updateDocGia: (id, docGia) => axiosMultipartFormData.patch(`/update/${id}`, docGia),
    deleteDocGia: (id) => axios.delete(`/delete/${id}`),
    getDocGiaByMaDocGia: (msNV) => axios.get(`/searchByMSNV/${msNV}`),
}

export default docGiaService