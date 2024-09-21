const nhanVienModel = require("../models/NhanVienModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const generateAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.SERCETKEYACCESSTOKEN,
        { expiresIn: "15m" }
    )
}
const generateRefreshToken = (user) => {
    return jwt.sign(
        user,
        process.env.SERCETKEYREFRESHTOKEN,
        { expiresIn: "1d" }
    )
}

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
                    const user = {
                        id: userData._id,
                        msNV: userData.msNV,
                        chucVu: userData.chucVu
                    }
                    console.log("A")
                    return nhanVienModel.findByIdAndUpdate(userData._id, {
                        refreshToken: generateRefreshToken(user)
                    }, { new: true })
                }
                else {
                    return null
                }

            })
            .then((userData) => {
                if (userData) {
                    const user = {
                        id: userData._id,
                        msNV: userData.msNV,
                        chucVu: userData.chucVu
                    }
                    res.cookie('refreshToken', userData.refreshToken, {
                        httpOnly: true,
                        sameSite: 'Strict',
                        maxAge: 24 * 60 * 60 * 1000
                    });
                    return res.status(200).json(generateAccessToken(user))
                }
            })
            .catch((err) => res.status(500).json({ message: err.message }))
    }
}
module.exports = AuthController
