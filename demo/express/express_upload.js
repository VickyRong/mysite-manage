var express = require('express');
var app = express();
var fs = require('fs');

var bodyParse = require('body-parser');
var multer = require('multer');

app.use('/public',express.static('public'));
app.use(bodyParse.urlencoded({ extend:false }));
app.use(multer({ dest:'/tmp/'}).array('image'));

app.get('/upload.html',function(req,res){
    res.sendFile(__dirname+'/'+'upload.html');
})

app.post('/file_upload',function(req,res){
    var des_file = __dirname + '/' + req.files[0].orginalname;
    console.log("文件信息：",req.files[0])
    fs.readFile(req.files[0].path,function(err,data){
        fs.writeFile(des_file,data,function(err){
            if(err){
                console.log(err)
            }else{
                response = {
                    message:'上传成功！',
                    filename:req.files[0].orginalname
                }
            }
            console.log('response:',JSON.stringify(response));
            res.end(JSON.stringify(response))
        })
    })
})

var server = app.listen(8082,function(){
    var host = server.address().address
    var port = server.address().port
 
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})