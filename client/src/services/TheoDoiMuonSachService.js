import createAxios from "@/utils/axios";

const axios = createAxios("/TheoDoiMuonSach")

const theoDoiMuonSachService = {
    createTheoDoiMuonSachs: (theoDoiMuonSachs) => axios.post("/createMany", theoDoiMuonSachs),

    getAllTheoDoiMuonSach: (filter) => axios.get("/", {
        params: filter
    }),
    getAllTheoDoiMuonSachByDocGia: (filter) => axios.get("/byDocGia", {
        params: filter
    }),
    getPagesOfTheoDoiMuonSach: (filter) => axios.get("/pages", {
        params: filter
    }),
    getPagesOfTheoDoiMuonSachByDocGia: (filter) => axios.get("/pagesByDocGia", {
        params: filter
    }),
    updateTrangThaiTheoDoiMuonSach: (sach) => axios.post("/updateTrangThaiTheoDoiMuonSach", sach)
}

export default theoDoiMuonSachService