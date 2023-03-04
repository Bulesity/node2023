const joi = require('joi');//导入定义验证规则的包
//定义用户名和密码的验证规则
const username = joi.string().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}