const express = require('express');
const express_joi = require('@escook/express-joi');
const router = express.Router();
const articleHandler = require('../router_handler/article');
const { articleAdd_schema, articleDelete_schema, articleUpdateById_schema } = require('../schema/article')
router.get('/articleCate', articleHandler.getArticleCateHandler);
router.post('/articleAddCate', express_joi(articleAdd_schema), articleHandler.addArticleCateHandler);
router.get('/articleDeleteCate/:articleId', express_joi(articleDelete_schema), articleHandler.deleteArticleCateHandler);
router.post('/updateArticleCateById', express_joi(articleUpdateById_schema), articleHandler.updateArticleCateById)
module.exports = router;