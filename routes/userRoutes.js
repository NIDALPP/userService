const express = require("express");
const router = express.Router()
const controller = require('../controllers/userCrud')
const authUser=require('../helpers/userAuth');
const { verifyAccessToken } = require("../helpers/jwtHelper");
// const userAuth=authUser.userAuth

router.post("/register",controller.register)
router.post("/login",controller.login)
router.post("/findUser",verifyAccessToken,controller.findUser)
module.exports = router