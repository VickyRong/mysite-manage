const { ObjectId } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Mysite";
var DB = "Mysite";

var serverOperate = {
    //新增一条数据
    insertOneRecord: (document,data,cb) => {
        collectionToDb(document,function(target){
            target.insertOne(data,function(err,res){
                if(err) throw err;
                cb && cb('成功插入单条记录！')
            })
        })
    },
    
    //新增多条数据
    insertManyRecord: (document,data,cb) => {
        collectionToDb(document,function(target){
            target.insertMany(data,function(err,res){
                if(err) throw err;
                cb && cb('成功插入多条记录！')
            })
        })
    },
     
    //查询数据
    queryRecord: (document,data,cb) =>{
        collectionToDb(document,function(target){
            var whereStr = data.whereStr ? data.whereStr : {};
            target.find(whereStr).toArray(function(err,result){
                if(err) throw err;
                cb && cb(result)
            })
        })
    },

    //删除数据
    deleteRecord: (document,data,cb) =>{
        collectionToDb(document,function(target){
            var whereStr = { _id: ObjectId(data.id) }
            target.deleteOne(whereStr,function(err,obj){
                if(err) throw err;
                cb && cb('数据删除成功!')
            })
        })
    },

    //编辑数据
    updateRecord: (document,data,cb) =>{
        collectionToDb(document,function(target){
            var whereStr = { _id: ObjectId(data.id) }
            var updateObj = data;
            delete updateObj._id;
            var updateStr = {$set:updateObj};
            target.updateOne(whereStr,updateStr,function(err,obj){
                if(err) throw err;
                cb && cb('数据更新成功!')
            })
        })
    }
}

//连接数据库
 collectionToDb = (document,cb) =>{
    MongoClient.connect(url,{ useNewUrlParser:true },function(err,db){
        if(err) throw err;
        var dbo = db.db(DB);
        var target = dbo.collection(document);
        cb && cb(target)
        db.close();
    })
}

module.exports = serverOperate;



