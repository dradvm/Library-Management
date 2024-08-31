const express = require("express")
const router = express.Router()
const theoDoiMuonSachController = require("../controllers/TheoDoiMuonSachController")

router.get("/", theoDoiMuonSachController.getAllTheoDoiMuonSach)
router.post("/create", theoDoiMuonSachController.createTheoDoiMuonSach)
router.patch("/update/:id", theoDoiMuonSachController.updateTheoDoiMuonSach)
router.delete("/delete/:id", theoDoiMuonSachController.deleteTheoDoiMuonSach)

module.exports = router