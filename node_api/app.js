const express = require('express');
const app = express();
const config = require('./config');  //导入配置文件
const joi = require('joi');
//配置跨域
const cors = require('cors');
app.use(cors());
//配置解析x-www-form-urlencoded的中间件
app.use(express.urlencoded({ extended: false })) //固定写法
//优化res.send()方法
app.use((req, res, next) => {
    res.sendc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})
//配置解析token的中间件
const expressJwt = require('express-jwt');
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }));
//导入用户登入，注册路由模块
const router = require('./router/user');
app.use('/api', router)
//导入获取用户信息路由模块
const userInfoRouter = require('./router/userInfo');

app.use('/my', userInfoRouter);
//定义全局错误中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) res.sendc(err);  //校验失败错误
    if (err.name == 'UnauthorizedError') res.sendc('身份认证失败');  //身份认证失败
    res.sendc(err);//未知失败
})
app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})