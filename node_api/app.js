const express = require('express');
const app = express();


//配置跨域
const cors = require('cors');
app.use(cors());
//配置解析x-www-form-urlencoded的中间件
app.use(express.urlencoded({ extended: false })) //固定写法
//导入用户路由模块
const router = require('./router/user');
app.use('/api', router)

app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})