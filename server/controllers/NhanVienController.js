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

        nhanVienModel.find({
            chucVu: "NhanVien"
        })
            .then((data) => Math.max(...data.map((item) => parseInt(item.msNV.replace("NV24", "")))))
            .then((data) => {
                const nhanVien = req.body
                console.log(data)
                data = (data === -Infinity || data === Infinity) ? 1 : (data + 1)
                nhanVien.msNV = `NV${new Date().getFullYear() - 2000}${data.toString().padStart(3, "0")}`
                return nhanVienModel.create(nhanVien)
            })

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
    getNewMSNV: (req, res) => {

    },

}

module.exports = nhanVienController