import createAxios from "@/utils/axios";

const axios = createAxios("/NhanVien")
const axiosMultipartFormData = createAxios("/NhanVien", "multipart/form-data")
const nhanVienService = {
    getAllNhanVien: () => axios.get("/"),
    // getAllNhanVienByFilter: (filter) => axios.get("/search", {
    //     params: filter
    // }),
    // getPagesOfNhanVien: (filter) => axios.get("/pages", {
    //     params: filter
    // }),
    createNhanVien: (NhanVien) => axiosMultipartFormData.post("/create", NhanVien),
    updateNhanVien: (id, NhanVien) => axiosMultipartFormData.patch(`/update/${id}`, NhanVien),
    deleteNhanVien: (id) => axios.delete(`/delete/${id}`),
    // getNewMaNhanVien: () => axios.get("/newMaNhanVien"),
    // getNhanVienByMaNhanVien: (maNhanVien) => axios.get(`/searchByMaNhanVien/${maNhanVien}`),
    getEnumChucVuValues: () => axios.get("/enumChucVuValues")
}

export default nhanVienService