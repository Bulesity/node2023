const db = require('../db');
exports.getArticleCateHandler = (req, res) => {
    const sql = `select * from ev_article_cate`;
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