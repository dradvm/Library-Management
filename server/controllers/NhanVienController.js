const nhanVienModel = require("../models/NhanVienModel")
const { uploadImageToFirebase, deleteImageFromFirebase, getNewUrlSignForAll } = require("../utils/firebase")

const nhanVienController = {
    getAllNhanVien: async (req, res) => {
        nhanVienModel.find()
            .select("-password -refreshToken")
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    getOneNhanVienById: async (req, res) => {
        nhanVienModel.findById(req.params.id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ message: err.message }))
    },
    createNhanVien: async (req, res) => {
        if (req.file) {
            const filePath = `NhanVien/${Date.now()}-${req.file.originalname}`
            uploadImageToFirebase(req.file, filePath)
                .then((data) => {
                    const nhanVien = {
                        ...req.body,
                        ...data,
                        duongDanHinhAnh: filePath,
                        msNV: "",
                        password: ""
                    }
                    const currentYear = new Date().getFullYear() - 2000
                    nhanVienModel.find({})
                        .then((data) => Math.max(...data.map((item) => parseInt(item.msNV.replace(`NV${currentYear}`, "")))))
                        .then((data) => {
                            data = (data === -Infinity || data === Infinity) ? 1 : (data + 1)
                            const newMSNV = `NV${currentYear}${data.toString().padStart(3, "0")}`
                            nhanVien.msNV = newMSNV
                            nhanVien.password = newMSNV
                            return nhanVienModel.create(nhanVien)
                        })
                        .then((data) => res.status(200).json({ message: "Tạo thành công nhân viên mới" }))
                        .catch((err) => {
                            deleteImageFromFirebase(filePath)
                                .then((data) => res.status(500).json({ message: err.message }))
                                .catch((err) => res.status(500).json({ message: err.message }))
                        })
                })
                .catch((err) => {
                    res.status(500).json({ message: err.message })
                })
        }
        else {
            res.status(500).json({ message: "Không có file" })
        }
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
    getEnumChucVuValues: (req, res) => {
        res.status(200).json(nhanVienModel.schema.path("chucVu").enumValues)
    }
}

module.exports = nhanVienController