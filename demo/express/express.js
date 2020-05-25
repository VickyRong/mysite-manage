var express = require('express');
var app = express();

app.get('/getData',function(req,res){
    res.send('getData : hello world');
})

var server = app.listen(8081,function(){
    var host = server.address().address;
    var post = server.address().port;
    console.log("应用实例，访问地址为：http://%s:%s",host,post);

})