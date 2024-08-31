import createAxios from "@/utils/axios";

const axios = createAxios("/NhaXuatBan")

const nhaXuatBanService = {
    getAllNhaXuatBan: () => axios.get("/"),
}

export default nhaXuatBanService