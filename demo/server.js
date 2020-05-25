var http = require('http');
var fs = require('fs');
var url = require('url');

//创建服务器
http.createServer(function(request,response){
  //解析文件名
  var pathname = url.parse(request.url).pathname;
  //输出请求的文件名
  console.log("Request for "+ pathname + " received.");
  //读取文件
  fs.readFile(pathname.substr(1),function(err,data){
      if(err){
        console.log(err)
        response.writeHead(404,{'Content-Type':'text/html'})
      }else{
        response.writeHead(200,{'Content-Type':'text/html'})
        response.write(data.toString());
      }
      console.log("data-----",data.toString())
      //发送响应数据
      response.end();
  })
}).listen(8080)

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');