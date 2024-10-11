const { getTokenFormReq, generateAccessToken, generateDataUser } = require("../utils/token")
const nhanVienModel = require("../models/NhanVienModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const authMiddleware = async (req, res, next) => {
    accessToken = getTokenFormReq(req)
    if (true) {
        next()
    }
    else if (accessToken) {
        jwt.verify(accessToken, process.env.SERCETKEYACCESSTOKEN, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    user = generateDataUser(jwt.decode(accessToken))
                    nhanVienModel.findOne({ msNV: user.msNV })
                        .then((data) => {
                            if (!data.refreshToken) {
                                return res.status(401).json({ message: "Refresh Token Missing" })
                            }
                            jwt.verify(data.refreshToken, process.env.SERCETKEYREFRESHTOKEN, (err) => {
                                if (err || data.refreshToken != req.cookies.refreshToken) {
                                    return res.status(440).json({ message: "Token hết hạn" })
                                }
                                else {
                                    newAccessToken = generateAccessToken(user)
                                    res.setHeader("newAccessToken", newAccessToken)
                                    console.log("Token mới")
                                    next()
                                }
                            })
                        })
                        .catch((err) => res.status(500))
                }
                else {
                    return res.status(440).json({ message: "Invalid token" })
                }
            }
            else {
                next()
            }
        })
    }
    else {
        res.status(440).json({ message: "Not allow" })
    }
}

module.exports = authMiddleware