const express = require("express");
const router = express.Router()
const controller=require('../controllers/userController');
const { userAuth } = require("../helpers/userAuth");


router.post("/register",controller.register)
router.post("/login",controller.login)
router.get("/findUser",controller.findUser)
module.exports = router
