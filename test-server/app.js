const express = require('express');
const app = express();
const bodypare = require('body-parser');
//app.use(bodypare.urlencoded());
app.post('/post',(req,res)=>{
    res.send(req.query);
})
app.listen('3000',()=>{
    console.log('server success!');
})