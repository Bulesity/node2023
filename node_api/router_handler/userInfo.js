const db = require('../db/index'); //导入数据库操作对象
const bcryptjs = require('bcryptjs');//导入密码加密模块
exports.getUserInfo = (req, res) => {
    const sql = `select username,nickname,email,user_pic from ev_users where id = ?`;
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.sendc(err);
        if (results.length !== 1) return res.sendc("用户信息不存在!");
        res.send({ status: 0, message: "获取用户信息成功", data: results[0] });
    })
}
exports.updateUserInfo = (req, res) => {
    const sql = `update ev_users set ? where id = ? `;
    db.query(sql, [{ nickname: req.body.nickname, email: req.body.email }, req.user.id], (err, results) => {
        if (err) return res.sendc(err);
        if (results.affectedRows !== 1) res.sendc('更新用户信息失败!');
        res.sendc('更新用户信息成功!', 0);
    });
}
exports.updatePassword = (req, res) => {
    const sql = `select password from ev_users where id = ?`;

    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.sendc(err);
        if (results.length !== 1) return res.sendc('客户信息不存在!');
        const checkPassword = bcryptjs.compareSync(req.body.oldPwd, results[0].password);
        if (!checkPassword) return res.sendc('旧密码不正确!');
        const newPassword = bcryptjs.hashSync(req.body.newPwd, 10);
        const updateSql = `update ev_users set password=? where id = ?`;
        db.query(updateSql, [newPassword, req.user.id], (err, results) => {
            if (err) return res.sendc(err);
            if (results.affectedRows !== 1) return res.sendc('重置密码失败!');
            res.sendc("重置密码成功!", 0);
        })
    })
}
exports.updateAvatar = (req, res) => {
    const sql = `select user_pic from ev_users where id = ?`;
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.sendc(err);
        if (results.length !== 1) return res.sendc('客户信息不存在!');
        const updateSql = `update ev_users set user_pic = ? where id = ?`;
        db.query(updateSql, req.user.id, (err, results) => {
            if (err) return res.sendc(err);
            if (results.affectedRows !== 1) return res.sendc('更换头像失败!');
            res.sendc('更换头像成功!', 0)
        })
    })
}
