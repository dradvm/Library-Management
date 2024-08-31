
const mongoose = require("mongoose")
require("dotenv").config()
const sachModel = require("../models/SachModel")
const nhaXuatBanModel = require("../models/NhaXuatBanModel")
module.exports = function connection() {
    mongoose.connect(process.env.MONGODB_CONNECTION + "/" + process.env.MONGODB_DATABASE)
        .then(() => {
            console.log("Connected to database")
            // const nxb = new nhaXuatBanModel({
            //     maNXB: "Kim Đồng",
            //     tenNXB: "Kim Đồng",
            //     diaChi: "Hà Nội"
            // })
            // nxb.save()
            // const sach = new sachModel({
            //     maSach: 125,
            //     tenSach: "Dế mèn phiêu lưu ký",
            //     donGia: 100000,
            //     soQuyen: 3,
            //     namXuatBan: 2020,
            //     maNXB: "66cdee6eb4a57ca15c64dadd",
            //     tacGia: "Tô Hoài",
            //     hinhAnh: "https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg"
            // })
            // sach.save()
        })
        .catch((err) => {
            console.log(err)
            process.exit(1)
        })
}
