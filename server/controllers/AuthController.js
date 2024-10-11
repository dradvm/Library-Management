const nhanVienModel = require("../models/NhanVienModel")
const bcrypt = require("bcrypt")
const { generateRefreshToken, generateAccessToken, generateDataUser } = require("../utils/token")
require("dotenv").config()

const AuthController = {
    login: async (req, res) => {
        const userLogin = req.body
        nhanVienModel.findOne({
            msNV: userLogin.msNV
        })
            .then((data) => {
                if (!data) {
                    res.status(401).json({ message: "Nhân viên không tồn tại" })
                    return null
                }
                return bcrypt.compare(userLogin.password, data.password).then((check) => {
                    if (check) {
                        return data
                    }
                    else {
                        res.status(401).json({ message: "Mã số nhân viên hoặc mật khẩu không đúng" })
                        return null
                    }
                })
            })

            .then((userData) => {
                if (userData) {
                    return nhanVienModel.findByIdAndUpdate(userData._id, {
                        refreshToken: generateRefreshToken(generateDataUser(userData))
                    }, { new: true })
                }
                else {
                    return null
                }

            })
            .then((userData) => {
                if (userData) {
                    res.cookie('refreshToken', userData.refreshToken, {
                        httpOnly: true,
                        sameSite: 'Strict',
                        maxAge: 24 * 60 * 60 * 1000
                    });
                    return res.status(200).json(generateAccessToken(generateDataUser(userData)))
                }
            })
            .catch((err) => res.status(500).json({ message: err.message }))
    }
}
module.exports = AuthController
