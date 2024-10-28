import createAxios from "@/utils/axios";

const axios = createAxios("/NhanVien")
const axiosMultipartFormData = createAxios("/NhanVien", "multipart/form-data")
const nhanVienService = {
    getAllNhanVien: () => axios.get("/"),
    getAllNhanVienByFilter: (filter) => axios.get("/search", {
        params: filter
    }),
    getPagesOfNhanVien: (filter) => axios.get("/pages", {
        params: filter
    }),
    createNhanVien: (nhanVien) => axiosMultipartFormData.post("/create", nhanVien),
    updateNhanVien: (id, nhanVien) => axiosMultipartFormData.patch(`/update/${id}`, nhanVien),
    deleteNhanVien: (id) => axios.delete(`/delete/${id}`),
    getNhanVienByMSNV: (msNV) => axios.get(`/searchByMSNV/${msNV}`),
    getEnumChucVuValues: () => axios.get("/enumChucVuValues")
}

export default nhanVienService