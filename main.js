var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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


// app.get('/saveMdFile',urlencodedParser,function(req,res){
//     // console.log("req~~~~~~:",req);
//     console.log("query:",req.query);
//     console.log("body-------:",req.body);
// })

app.post('/saveMdFile',function(req,res){
    console.log("req~~~~~~:",req);
    console.log("query:",req.query);
    console.log("body-------:",req.body);
})

var server = app.listen(8082,function(){
    var host = server.address().address
    var port = server.address().port
 
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})