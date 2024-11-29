const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { adminAuth } = require('../helpers/userAuth');




router.post('/register', userController.register);
router.post('/findUser',adminAuth,userController.findUser)
router.get('/findAll', adminAuth, userController.findAll);
router.post('/deleteUser', adminAuth, userController.deleteUser);
router.post('/updateUser', adminAuth, userController.updateUser);

module.exports = router;
