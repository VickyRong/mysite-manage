var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//应用application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended:false }))
//应用application/json格式
app.use(bodyParser.json());

app.get('/index.html',function(req,res){
    res.sendFile(__dirname+'/'+'index.html');
})

app.post('/process_post',function(req,res){
    console.log("query:",req.query)
    console.log("body:",req.body)
    var response = {
        fristName:req.body.first_name,
        lastName:req.body.last_name
    }
    console.log(JSON.stringify(response))
    res.end(JSON.stringify(response))
})

var server = app.listen(8082,function(){
    var host = server.address().address
    var port = server.address().port
 
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})