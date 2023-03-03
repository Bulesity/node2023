const db = require('../db/index'); //导入数据库操作对象
const bcryptjs = require('bcryptjs');//导入密码加密模块
exports.reguser = (req, res) => {
    const body = req.body;
    if (!body.username || !body.password) {
        return res.send('用户名或密码不能为空!')
    }
    const sql = "select id from ev_users where username = ?";
    db.query(sql, body.username, (err, result) => {
        if (err) return res.send({ status: 1, message: err.message });
        if (result.length) return res.send({ status: 1, message: '该用户已存在' });
        body.password = bcryptjs.hashSync(body.password, 10);

    })
    res.send('reguser ok')
}
exports.login = (req, res) => {
    res.send('login ok')
}