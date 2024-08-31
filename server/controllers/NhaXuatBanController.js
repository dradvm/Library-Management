const nhaXuatBanModel = require("../models/NhaXuatBanModel")

const nhaXuatBanController = {
    getAllNhaXuatBan: async (req, res) => {
        nhaXuatBanModel.find({})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    getOneNhaXuatBanById: async (req, res) => {
        nhaXuatBanModel.findById(req.params.id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    createNhaXuatBan: async (req, res) => {
        nhaXuatBanModel.create(req.body)
            .then((data) => res.status(200).json({ message: "Tạo nhà xuất bản thành công!" }))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    updateNhaXuatBan: async (req, res) => {
        nhaXuatBanModel.findByIdAndUpdate(req.params.id, req.body)
            .then((data) => res.status(200).json({ message: "Cập nhật nhà xuất bản thành công!" }))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    deleteNhaXuatBan: async (req, res) => {
        nhaXuatBanModel.findByIdAndDelete(req.params.id)
            .then((data) => res.status(200).json({ message: "Xóa nhà xuất bản thành công!" }))
            .catch((err) => res.status(500).json({ message: err.message }))
    }

}

module.exports = nhaXuatBanController