const mongoose = require("mongoose")

const docGiaSchema = new mongoose.Schema({
    maDocGia: {
        type: String,
        require: true,
        unique: true
    },
    hoLot: {
        type: String,
        require: true
    },
    ten: {
        type: String,
        require: true
    },
    ngaySinh: {
        type: Date,
        require: true
    },
    phai: {
        type: Boolean,
        require: true,
    },
    diaChi: {
        type: String,
        require: true
    },
    dienThoai: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("DocGia", docGiaSchema)