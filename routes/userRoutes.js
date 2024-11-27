const express = require("express");
const router = express.Router()
const controller = require('../controllers/userCrud')


router.post("/register", controller.register)
router.post("/findAll",controller.findAll)
router.post("/login",controller.login)
router.post("/deleteUser",controller.deleteUser)
router.post("/updateUser",controller.updateUser)
router.post("/findUser",controller.findUser)
module.exports = router