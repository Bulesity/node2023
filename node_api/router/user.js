const express = require('express');
const router = express.Router();
const userHandler = require('../router_handler/user');
const express_joi = require('@escook/express-joi');
const { reg_login_schema } = require('../schema/user');
router.post('/reguser', express_joi(reg_login_schema), userHandler.reguser);

router.post('/login', express_joi(reg_login_schema), userHandler.login);

module.exports = router;