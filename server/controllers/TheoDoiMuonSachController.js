const theoDoiMuonSachModel = require("../models/TheoDoiMuonSachModel")

const theoDoiMuonSachController = {
    getAllTheoDoiMuonSach: async (req, res) => {
        theoDoiMuonSachModel.find({})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    getTheoDoiMuonSachById: async (req, res) => {
        theoDoiMuonSachModel.findById(req.params.id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    getTheoDoiMuonSachByMaDocGia: async (req, res) => {
        theoDoiMuonSachModel.find({
            maDocGia: req.query.maDocGia
        })
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    getTheoDoiMuonSachByMSNV: async (req, res) => {
        theoDoiMuonSachModel.find({
            msNV: req.query.msNV
        })
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    getTheoDoiMuonSachByMaDocGiaAndMSNV: async (req, res) => {
        theoDoiMuonSachModel.find({
            maDocGia: req.query.maDocGIa,
            msNV: req.query.msNV
        })
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    createTheoDoiMuonSach: async (req, res) => {
        theoDoiMuonSachModel.create(re.body)
            .then((data) => res.status(200).json("Tạo thành công!"))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    updateTheoDoiMuonSach: async (req, res) => {
        theoDoiMuonSachModel.findByIdAndUpdate(req.params.id, req.body)
            .then((data) => res.status(200).json("Cập nhật thành công!"))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    deleteTheoDoiMuonSach: async (req, res) => {
        theoDoiMuonSachModel.findByIdAndDelete(req.params.id)
            .then((data) => res.status(200).json("Xóa thành công!"))
            .catch((err) => res.status(500).json({ message: err.message }))
    }
}

module.exports = theoDoiMuonSachController