var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');

//设置跨域访问--貌似没用，浏览器使用cors插件
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//应用application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended:false }))
//应用application/json格式
app.use(bodyParser.json());

//新增用户
app.post('/addUser',function(req,res){
    var params = req.body || {};
    db.insertOneRecord('user',params,function(data){
        res.send({res:data})
    })
})

//删除用户
app.post('/deleteUser',function(req,res){
    var params = req.body || {};
    db.deleteRecord('user',params,function(data){
        res.send({res:data})
    })
})

//查询用户
app.post('/queryUser',function(req,res){
    var params = req.body || {};
    db.queryRecord('user',params,function(data){
        res.send({res:data})
    })
})

//更新用户
app.post('/updateUser',function(req,res){
    var params = req.body || {};
    console.log('更新参数--------：',params)
    db.updateRecord('user',params,function(data){
        res.send({res:data})
    })
})



//查询文章
app.post('/queryBlog',function(req,res){
    var params = req.body || {};
    db.queryRecord('blog',params,function(data){
        res.send({res:data})
    })
})

//删除文章
app.post('/deleteBlog',function(req,res){
    var params = req.body || {};
    db.deleteRecord('blog',params,function(data){
        res.send({res:data})
    })
})

var server = app.listen(8082,function(){
    var host = server.address().address
    var port = server.address().port
 
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})