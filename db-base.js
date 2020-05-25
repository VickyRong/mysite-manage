var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Mysite";

MongoClient.connect(url,{ useNewUrlParser:true },function(err,db){
    if(err) throw err;
    var dbo = db.db("Mysite");
        // 【建立collection】
        dbo.createCollection('blog', function (err, res) {
            if (err) throw err;
            console.log("创建集合!");
            db.close();
        });
        // 【插入一条数据】
        var myobj = { name:'包小胡同学',sex:'女' };
        dbo.collection("blog").insertOne(myobj,function(err,res){
            if(err) throw err;
            console.log("文档插入成功!");
            db.close();
        })
        // 【插入多条数据】
        var myobj =  [
            { name: 'Wechat', url: 'https://www.wechat.com', type: 'cn'},
            { name: 'Google', url: 'https://www.google.com', type: 'en'},
            { name: 'Facebook', url: 'https://www.google.com', type: 'en'},
            { name: 'Taobao', url: 'https://www.taobao.com', type: 'en'},
            { name: 'Baidu', url: 'https://www.baidu.com', type: 'en'},
           ];
        dbo.collection("blog").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("插入的文档数量为: " + res.insertedCount);
            db.close();
        });
        //【查询数据】
        dbo.collection("blog").find({}).toArray(function(err,result){
            if(err) throw err;
            console.log("result:",result);
            db.close();
        })
        //【查询指定条件的数据】
        var whereStr = {'name':'菜鸟工具'};
        dbo.collection('blog').find(whereStr).toArray(function(err,result){
            if(err) throw err;
            console.log("res:",result);
            db.close()
        })
        //【更新数据】
        var whereStr = {'name':'菜鸟工具'};
        var updateStr = {$set:{ "url": "https://www.baidu.com" }};
        dbo.collection('blog').updateOne(whereStr,updateStr,function(){
            if(err) throw err;
            console.log('文档更新成功！');
            db.close();
        })
        //【更新多条数据】
        var whereStr = { type:'en' } //查询条件
        var updateStr = { $set:{ "url":"https:www.taobao.com" }};
        dbo.collection('blog').updateMany(whereStr,updateStr,function(err,res){
            if(err) throw err;
            console.log(res.result.nModified + ' 条文档被更新');
            db.close();
        })
        //【删除一条数据】
        var whereStr = {"name":"菜鸟工具"};
        dbo.collection('blog').deleteOne(whereStr,function(err,obj){
            if(err) throw err;
            console.log('文档删除成功');
            db.close();
        })
        //【删除多条数据】
        var whereStr = { type:'en' };
        dbo.collection('blog').deleteMany(whereStr,function(err,obj){
            if(err) throw err;
            console.log(obj.result.n + ' 条文档被删除');
            db.close();
        })
        // 【查询分页】      
        dbo.collection('blog').find().limit(2).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
            db.close();
        })  
        dbo.collection('blog').find().skip(2).limit(2).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
            db.close();
        })  
})


