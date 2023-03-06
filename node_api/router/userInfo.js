const express = require('express');
const express_joi = require('@escook/express-joi');
const { updateUserInfo_schema, updatePwd_schema, updateAvatar_schema } = require('../schema/user')
const router = express.Router();
const userInfoHandler = require('../router_handler/userInfo');
router.get('/getUserInfo', userInfoHandler.getUserInfo);
router.post('/updateUserInfo', express_joi(updateUserInfo_schema), userInfoHandler.updateUserInfo);
router.post('/updatePwd', express_joi(updatePwd_schema), userInfoHandler.updatePassword);
router.post('/updateAvatar', express_joi(updateAvatar_schema), userInfoHandler.updateAvatar);
module.exports = router;