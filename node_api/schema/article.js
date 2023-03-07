const joi = require('joi');//导入定义验证规则的包
const name = joi.string().required();
const alias = joi.string().required();
const articleId = joi.number().integer().min(1).required();
exports.articleAdd_schema = {
    body: {
        name,
        alias
    }
}
exports.articleDelete_schema = {
    params: {
        articleId
    }
}
exports.articleUpdateById_schema = {
    body: {
        articleId,
        name,
        alias
    }
}