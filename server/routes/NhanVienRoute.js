const express = require("express")
const router = express.Router()
const nhanVienController = require("../controllers/NhanVienController")

router.get("/", nhanVienController.getAllNhanVien)
router.post("/create", nhanVienController.createNhanVien)
router.patch("/update/:id", nhanVienController.updateNhanVien)
router.delete("/delete/:id", nhanVienController.deleteNhanVien)
router.get("/search/:id", nhanVienController.getOneNhanVienById)
router.get("/newMSNV", nhanVienController.getNewMSNV)

module.exports = router