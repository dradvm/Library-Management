const jwt = require("jsonwebtoken")
require("dotenv").config()
const getTokenFormReq = (req) => {
    const authHeader = req.headers["authorization"]
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1]
    }
    return null
}
const generateDataUser = (data) => {
    return {
        id: data.id || data._id,
        msNV: data.msNV,
        chucVu: data.chucVu
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.SERCETKEYACCESSTOKEN,
        { expiresIn: "5m" }
    )
}
const generateRefreshToken = (user) => {
    return jwt.sign(
        user,
        process.env.SERCETKEYREFRESHTOKEN,
        { expiresIn: "1d" }
    )
}

module.exports = { getTokenFormReq, generateAccessToken, generateRefreshToken, generateDataUser }