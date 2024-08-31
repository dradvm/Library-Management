const mongoose = require("mongoose")

const theoDoiMuonSach = new mongoose.Schema({
    maDocGia: {
        type: mongoose.Schema.ObjectId,
        ref: "DocGia",
        require: true
    },
    msNV: {
        type: mongoose.Schema.ObjectId,
        ref: "NhanVien",
        require: true
    },
    ngayMuon: {
        type: Date,
        require: true,
        default: Date()
    },
    ngayTra: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model("TheoDoiMuonSach", theoDoiMuonSach)