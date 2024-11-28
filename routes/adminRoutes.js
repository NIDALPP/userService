const express = require('express');
const router = express.Router();
const controller = require('../controllers/userCrud');
const { verifyAccessToken } = require('../helpers/jwtHelper');
const userAuth=require('../helpers/userAuth');
const { authSchema } = require('../helpers/validation');
const adminAuth=userAuth.adminAuth



router.post('/register', controller.register);
router.post('/findAll',verifyAccessToken, adminAuth, controller.findAll);
router.post('/deleteUser', verifyAccessToken, adminAuth, controller.deleteUser);
router.post('/updateUser', verifyAccessToken, adminAuth, controller.updateUser);

module.exports = router;
