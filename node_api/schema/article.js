const joi = require('joi');//导入定义验证规则的包
const name = joi.string().required();
const alias = joi.string().required();
exports.articleAdd_schema = {
    body: {
        name,
        alias
    }
}