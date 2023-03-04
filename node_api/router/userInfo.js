const express = require('express');
const router = express.Router();
const userInfoHandler = require('../router_handler/userInfo');
router.get('/getUserInfo', userInfoHandler.getUserInfo);
router.post('/updateUserInfo', userInfoHandler.updateUserInfo);
module.exports = router;