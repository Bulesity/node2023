const db = require('../db/index'); //导入数据库操作对象
const bcryptjs = require('bcryptjs');//导入密码加密模块
const jsonwebtoken = require('jsonwebtoken');//导入token模块
const { jwtSecretKey, expiresIn } = require('../config');
const { json } = require('express');
exports.reguser = (req, res) => {
    const body = req.body;
    // if (!body.username || !body.password) {
    //     return res.sendc('用户名或密码不能为空')
    // }
    const sql = "select id from ev_users where username = ?";
    db.query(sql, body.username, (err, result) => {
        if (err) return res.sendc(err);
        if (result.length) return res.sendc('该用户已存在');
        body.password = bcryptjs.hashSync(body.password0);
        const inertsql = "insert into ev_users set ?";
        db.query(inertsql, { username: body.username, password: body.password, nickname: body.nickname || '', email: body.email || '' }, (err, results) => {
            if (err) return res.sendc(errr);
            if (results.affectedRows !== 1) return res.sendc('注册失败!');
            res.sendc('注册成功!', 0);
        })
    })
    //res.sendc('reguser ok')
}
exports.login = (req, res) => {
    const { username, password } = req.body;
    const sql = "select * from ev_users where username = ?";
    db.query(sql, username, (err, results) => {
        if (err) return res.sendc(err);
        if (results.length !== 1) return res.sendc('用户名不存在！');
        //校验密码是否则正确
        const passwordCheck = bcryptjs.compareSync(password, results[0].password);
        if (!passwordCheck) return res.sendc('用户密码不正确!');
        //生成token返回给客户端
        const userInfo = { ...results[0], password: '', user_pic: '' };
        const tokenStr = jsonwebtoken.sign(userInfo, jwtSecretKey, { expiresIn });
        res.send({ status: 0, message: '登入成功!', token: 'Bearer ' + tokenStr });
    })
    //res.sendc('login ok')
}