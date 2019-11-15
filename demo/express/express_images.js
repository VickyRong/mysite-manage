var express = require('express');
var app = express();

app.use('/public',express.static('public'));

app.get('/',function(req,res){
    res.send('get images');
})

var server = app.listen(8082,function(){

    var host = server.address().address;
    var port = server.address().port;

    console.log('应用实例，访问地址为 http://%s:%s',host,port);

})

//在浏览器中访问 localhost:8082/public/images/01.jpg 可以访问到项目中的图片