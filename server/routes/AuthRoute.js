const express = require("express")
const router = express.Router()
const authController = require("../controllers/AuthController")



router.post("/loginEmployee", authController.loginEmployee)
router.post("/register", authController.register)


module.exports = router

