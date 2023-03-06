const express = require('express');
const express_joi = require('@escook/express-joi');
const router = express.Router();
const articleHandler = require('../router_handler/article');
const { articleAdd_schema } = require('../schema/article')
router.get('/articleCate', articleHandler.getArticleCateHandler);
router.post('/articleAddCate', express_joi(articleAdd_schema), articleHandler.addArticleCateHandler);
module.exports = router;