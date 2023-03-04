const db = require('../db/index'); //导入数据库操作对象
exports.getUserInfo = (req, res) => {
    const sql = `select username,nickname,email,user_pic from ev_users where id = ?`;
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.sendc(err);
        if (results.length !== 1) return res.sendc("用户信息不存在!");
        res.send({ status: 0, message: "获取用户信息成功", data: results[0] });
    })
}
exports.updateUserInfo = (req, res) => {
    res.send('ok ')
}
