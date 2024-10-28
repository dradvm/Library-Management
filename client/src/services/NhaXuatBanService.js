import createAxios from "@/utils/axios";

const axios = createAxios("/NhaXuatBan")

const nhaXuatBanService = {
    getAllNhaXuatBan: () => axios.get("/"),
    getOneNhaXuatBanById: (id) => axios.get(`/search/${id}`),
    getAllNhaXuatBanByFilter: (filter) => axios.get("/search", {
        params: filter
    }),
    getPagesOfNhaXuatBan: (filter) => axios.get("/pages", {
        params: filter
    }),
    createNhaXuatBan: (nhaXuatBan) => axios.post("/create", nhaXuatBan),
    updateNhaXuatBan: (id, nhaXuatBan) => axios.patch(`/update/${id}`, nhaXuatBan),
    deleteNhaXuatBan: (id) => axios.delete(`/delete/${id}`),
}

export default nhaXuatBanService