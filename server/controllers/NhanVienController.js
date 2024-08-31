const nhanVienModel = require("../models/NhanVienModel")

const nhanVienController = {
    getAllNhanVien: async (req, res) => {
        nhanVienModel.find()
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    getOneNhanVienById: async (req, res) => {
        nhanVienModel.findById(req.params.id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    createNhanVien: async (req, res) => {
        nhanVienModel.create(req.body)
            .then((data) => res.status(200).json({ message: "Tạo thành công nhân viên mới" }))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    updateNhanVien: async (req, res) => {
        nhanVienModel.findByIdAndUpdate(req.params.id, req.body)
            .then((data) => res.status(200).json({ message: "Cập nhật thành công" }))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    deleteNhanVien: async (req, res) => {
        nhanVienModel.findByIdAndDelete(req.params.id)
            .then((data) => res.status(200).json({ message: "Xóa nhân viên thành công" }))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
}

module.exports = nhanVienController