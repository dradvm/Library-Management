const mongoose = require("mongoose")

const nhanVienSchema = new mongoose.Schema({
    msNV: {
        type: String,
        require: true,
        unique: true
    },
    hoTenNV: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    chucVu: {
        type: String,
        require: true
    },
    diaChi: {
        type: String,
        require: true
    },
    soDienThoai: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("NhanVien", nhanVienSchema)