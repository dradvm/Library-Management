const express = require("express")
const cors = require("cors")
const morgan = require("./utils/morgan")
const connection = require("./utils/connection")
const sachRoute = require("./routes/SachRoute")
const docGiaRoute = require("./routes/DocGiaRoute")
const nhanVienRoute = require("./routes/NhanVienRoute")
const nhaXuatBanRoute = require("./routes/NhaXuatBanRoute")
const theoDoiMuonSachRoute = require("./routes/TheoDoiMuonSachRoute")
const authRoute = require("./routes/AuthRoute")
require("dotenv").config()


const app = express()
const port = process.env.port || 3000
const router = express.Router()

router.use("/Sach", sachRoute)
router.use("/NhaXuatBan", nhaXuatBanRoute)
router.use("/NhanVien", nhanVienRoute)
router.use("/DocGia", docGiaRoute)
router.use("/TheoDoiMuonSach", theoDoiMuonSachRoute)
router.use("/Auth", authRoute)




connection()
app.use(cors())
    .use(express.json())
    .use(morgan)

    .use("/api", router)

    .listen(port, () => {
        console.log(`Server running at port: ${port}`)
    })