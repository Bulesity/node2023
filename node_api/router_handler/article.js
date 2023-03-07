const db = require('../db');
exports.getArticleCateHandler = (req, res) => {
    const sql = `select * from ev_article_cate where is_delete = 0`;
    db.query(sql, (err, results) => {
        if (err) return res.sendc(errr);
        res.send({
            status: 0,
            message: "获取数据成功!",
            data: results
        })
    })
}
exports.addArticleCateHandler = (req, res) => {
    const sqlc = "select id from ev_article_cate where name like ? or alias like ?";
    db.query(sqlc, [`%${req.body.name}%`, `%${req.body.alias}%`], (err, results) => {
        console.log(sqlc)
        if (err) return res.sendc(err);
        if (results.length > 0) return res.sendc('该分类已存在!');
        const sql = `insert into ev_article_cate set ?`;
        db.query(sql, { name: req.body.name, alias: req.body.alias }, (err, results) => {
            if (err) return res.sendc(err);
            if (results.affectedRows !== 1) return res.sendc('新增文章分类失败!')
            res.sendc('新增文章分类成功!', 0)
        })
    })

}
exports.deleteArticleCateHandler = (req, res) => {
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?';
    db.query(sql, req.params.articleId, (err, results) => {
        if (err) return res.sendc(err);
        if (results.affectedRows !== 1) return res.sendc('删除文章分类失败!');
        res.sendc('删除文章分类成功!', 0)
    })
}
exports.updateArticleCateById = (req, res) => {
    const sql = `select * from ev_article_cate where id != ? and (name = ? or alias = ?)`;
    db.query(sql, [req.body.articleId, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.senc(err);
        if (results.length == 2) return res.sendc('分类名称和别名都已存在，请更换后重试!');
        if (results.find(item => item.name == req.body.name && item.alias == req.body.alias)) return res.sendc('分类名称和别名都已存在，请更换后重试!');
        if (results.find(item => item.name == req.body.name)) return res.sendc('分类名称已存在，请更换后重试!')
        if (results.find(item => item.alias == req.body.alias)) return res.sendc('分类别名已存在，请更换后重试!')
        const updateSql = `update ev_article_cate set ? where id=?`;
        db.query(updateSql, [{ name: req.body.name, alias: req.body.alias }, req.body.articleId], (err, results) => {
            if (err) return res.senc(err);
            if (results.affectedRows != 1) return res.sendc('更新分类信息失败!');
            res.sendc('更新文章分类信息成功！', 0)
        })
    })
}