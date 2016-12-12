var mongoose = require('mongoose');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var groupModel = require('../models/groups');
var userModel = require('../models/users');
var articleModel = require('../models/articles');
var imageModel = require('../models/pictures');
var audioModel = require('../models/audios');
var videoModel = require('../models/videos')
var topicModel = require('../models/topics');
var multiparty = require('multiparty');
var async = require('async');
var util = require('util');
var path = require('path');

exports.newTopic = function(userId,req,socket,callback){
  var id =new mongoose.Types.ObjectId;
  var newTopic = new topicModel({
    _id:mongoose.Types.ObjectId(id),
    group_id:req.body.group_id,
    topic_title:req.body.topic_title,
    topic_detail:req.body.topic_description,
    createdBy:userId,
  },{collection:'topics'});


  newTopic.save(function(err,newTopic){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      groupModel.findByIdAndUpdate(req.body.group_id,{$addToSet:{"group_topics":id}},{safe:true,upsert:true},function(err){
      if(err){
        callback({"message":"unsuccessful"});
      }else{
        // socket.to(req.body.room).emit("newTopic",{"topicId":id,"userId":req.body.userId});
        callback({"message":"successful"});
      }
    });
    }
  });
}



exports.newArticle = function(userId,topicId,marticle,socketMap,io,callback){
 var id = new mongoose.Types.ObjectId;
 var newArticle = new articleModel({
    _id:mongoose.Types.ObjectId(id),
    topic_id:topicId,
    publishedBy:userId,
    createdOn:Date.now(),
    article_content:marticle,
    content_type:"texts"
  },{collection:'articles'});
  newArticle.save(function(err,newArticle){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      topicModel.findByIdAndUpdate(topicId,{$addToSet:{"articles":{'_id':mongoose.Types.ObjectId(id)}}},{safe:true,upsert:true},function(err,model){
      if(err){
        callback({"message":"unsuccessful"});
      }else{
        console.log("groupId:"+ model.toObject().group_id);

        //  io.in(model.room_id).emit("newarticle",{"articleId":id});
        // console.log(io);
        // io.to('some room').emit('some event'):
        // io.emit('newarticle',{"articleId":id});
        //
        userModel.findByIdAndUpdate(userId,{$addToSet:{"myarticles":id},safe:true,upsert:true},function(err){
          if(err){
            callback({"message":"unsuccessful"});
          }else{
            io.to(topicId).emit('newarticle',{"articleId":id});
            // socketMap.get(userId).emit('newarticle',{"articleId":id});
            // socketMap.get(userId).broadcast.to(topicId).emit('newarticle',{"articleId":id});
              // socketMap.get("shubham").emit('newarticle',{"articleId":id});
              callback({"message":"successful"});
          }
        });

      }
    });
    }
  });
}


exports.newImage = function(req,socketMap,callback){
    var count = 0;
    var form = new multiparty.Form();
    var mypath;
    form.uploadDir = path.normalize('../media');
    var mytoken;
    var topicId;
    var userId;

    form.on('error',function(err){
      console.log("ERROR");
    });
    form.on('part',function(part){
      if(!part.filename){
        console.log('got field named'+part.name);
        //fields content work
        var imageId = new mongoose.Types.ObjectId;
        console.log(imageId);
        console.log(part);
        part.resume();
      }
      if(part.filename){
        count++;
        console.log('got file named'+part.name);
        part.resume();
      }
      part.on('error',function(err){
       console.log("err");
      });
    });
    form.on('field',function(name,value){
      console.log(name+":"+value);
      if(name=='token'){
        var decoded = jwt.verify(value,'abcdefghijklmnopqr/123@!@#$%');
        console.log(decoded.foo)
        userId = decoded.foo;
      }else if(name=='topicId'){
        topicId = value;
      }
    });
    form.on('file',function(name,value){
      console.log(util.inspect(value, false, null));
      mypath = value.path;
    });
    form.on('close',function(){
      console.log(userId);
      console.log(topicId);
      var imageId = new mongoose.Types.ObjectId;
      fs.rename(mypath,path.normalize('../media')+"/"+imageId,function(err){
        if(err){
          console.log(err);
          callback({"message":"unsuccessful"});
      }else{
      var newArticle = new articleModel({
          _id:mongoose.Types.ObjectId(imageId),
          topic_id:topicId,
          article_content:imageId,
          content_type:"image",
          publishedBy:userId,
          });
          newArticle.save(function(err,newArticle){
            if(err){
              callback({"message":"unsuccessful"});
            }else{
              topicModel.findByIdAndUpdate(topicId,{$addToSet:{"articles":{'_id':mongoose.Types.ObjectId(imageId)}}},{safe:true,upsert:true},function(err,model){
              if(err){
                callback({"message":"unsuccessful"});
              }else{
                // io.in(model.group_id).emit('newarticle',{"articleId":imageId});
                userModel.findByIdAndUpdate(userId,{$addToSet:{"myarticles":imageId},safe:true,upsert:true},function(err){
                  if(err){
                    callback({"message":"unsuccessful"});
                  }else{
                    socketMap.get("shubham").emit('newarticle',{"articleId":imageId});
                    callback({"message":"successful"});
                  }
                });

              }
            });
            }
          });
        }
    });
  });
      form.parse(req);
}



exports.newAudio = function(req,socket,callback){
    var count = 0;
    var form = new multiparty.Form();
    var path = "/home/shubham/mygithub/";
    var mypath;
    form.uploadDir = "/home/shubham/mygithub/";
    var mytoken;
    var topicId;
    var userId;

    form.on('error',function(err){
      console.log("ERROR");
    });
    form.on('part',function(part){
      if(!part.filename){
        console.log('got field named'+part.name);
        //fields content work
        var imageId = new mongoose.Types.ObjectId;
        console.log(imageId);
        console.log(part);
        part.resume();
      }
      if(part.filename){
        count++;
        console.log('got file named'+part.name);
        part.resume();
      }
      part.on('error',function(err){
       console.log("err");
      });
    });
    form.on('field',function(name,value){
      console.log(name+":"+value);
      if(name=='token'){
        var decoded = jwt.verify(value,'abcdefghijklmnopqr/123@!@#$%');
        console.log(decoded.foo)
        userId = decoded.foo;
      }else if(name=='topicId'){
        topicId = value;
      }
    });
    form.on('file',function(name,value){
      console.log(util.inspect(value, false, null));
      mypath = value.path;
    });
    form.on('close',function(){
      console.log(userId);
      console.log(topicId);
      var imageId = new mongoose.Types.ObjectId;
      fs.rename(mypath,path+"/"+imageId,function(err){
        if(err){
          console.log(err);
          callback({"message":"unsuccessful"});
      }else{
      var newArticle = new articleModel({
          _id:mongoose.Types.ObjectId(imageId),
          topic_id:topicId,
          article_content:path+"/"+imageId,
          content_type:"image",
          publishedBy:userId,
          });
          newArticle.save(function(err,newArticle){
            if(err){
              callback({"message":"unsuccessful"});
            }else{
              topicModel.findByIdAndUpdate(topicId,{$addToSet:{"articles":{'_id':mongoose.Types.ObjectId(imageId)}}},{safe:true,upsert:true},function(err){
              if(err){
                callback({"message":"unsuccessful"});
              }else{
                // io.to(req.body.room).emit('newarticle',{"articleId":newArticle[0].toObject()._id});
                userModel.findByIdAndUpdate(userId,{$addToSet:{"myarticles":imageId},safe:true,upsert:true},function(err){
                  if(err){
                    callback({"message":"unsuccessful"});
                  }else{
                    socketMap.get("shubham").emit('newarticle',{"articleId":id});
                    callback({"message":"successful"});
                  }
                });

              }
            });
            }
          });
        }
    });
  });
      form.parse(req);
}

exports.newVideo = function(req,socket,callback){
    var count = 0;
    var form = new multiparty.Form();
    var path = "/home/shubham/mygithub/";
    var mypath;
    form.uploadDir = "/home/shubham/mygithub/";
    var mytoken;
    var topicId;
    var userId;
    var os = require('os');
    console.log("os"+os.homedir());
    form.on('error',function(err){
      console.log("ERROR");
    });
    form.on('part',function(part){
      if(!part.filename){
        console.log('got field named'+part.name);
        //fields content work
        var imageId = new mongoose.Types.ObjectId;
        console.log(imageId);
        console.log(part);
        part.resume();
      }
      if(part.filename){
        count++;
        console.log('got file named'+part.name);
        part.resume();
      }
      part.on('error',function(err){
       console.log("err");
      });
    });
    form.on('field',function(name,value){
      console.log(name+":"+value);
      if(name=='token'){
        var decoded = jwt.verify(value,'abcdefghijklmnopqr/123@!@#$%');
        console.log(decoded.foo)
        userId = decoded.foo;
      }else if(name=='topicId'){
        topicId = value;
      }
    });
    form.on('file',function(name,value){
      console.log(util.inspect(value, false, null));
      mypath = value.path;
    });
    form.on('close',function(){
      console.log(userId);
      console.log(topicId);
      var imageId = new mongoose.Types.ObjectId;
      fs.rename(mypath,path+imageId,function(err){
        if(err){
          console.log(err);
          callback({"message":"unsuccessful"});
      }else{
      var newArticle = new articleModel({
          _id:mongoose.Types.ObjectId(imageId),
          topic_id:req.body.topicId,
          article_content:path+"/"+imageId,
          content_type:"image",
          publishedBy:userId,
          });
          newArticle.save(function(err,newArticle){
            if(err){
              callback({"message":"unsuccessful"});
            }else{
              topicModel.findByIdAndUpdate(topicId,{$addToSet:{"articles":{'_id':mongoose.Types.ObjectId(imageId)}}},{safe:true,upsert:true},function(err){
              if(err){
                callback({"message":"unsuccessful"});
              }else{
                // io.to(req.body.room).emit('newarticle',{"articleId":newArticle[0].toObject()._id});
                userModel.findByIdAndUpdate(userId,{$addToSet:{"myarticles":imageId},safe:true,upsert:true},function(err){
                  if(err){
                    callback({"message":"unsuccessful"});
                  }else{
                    callback({"message":"successful"});
                  }
                });

              }
            });
            }
          });
        }
    });
  });
      form.parse(req);
}
exports.getTopics = function(groupId,callback){
   var query = topicModel.find({'group_id':groupId}).select('topic_title _id topic_detail');
   query.exec(function(err,topics){
     callback(topics);
   });
}
exports.getTopicsWithArticle = function(groupId,callback){
  var responseArray = new Array();

  var query = topicModel.find({'group_id':groupId}).select('topic_title _id topic_detail');
   query.exec(function(err,docs){
      var asyncTask = [];
      docs.forEach(function(item){
        asyncTask.push(function(call){
          var query2 = articleModel.find({'topic_id':item.toObject()._id}).sort('-createdOn').select("_id content_type article_content").limit(1);
          query2.exec(function(err,articles){
            var jsonObject  = new Object();
            console.log(articles);
              jsonObject.topicId = item.toObject()._id;
              jsonObject.topic_detail = item.toObject().topic_detail;
              jsonObject.topic_title = item.toObject().topic_title;

            if(articles[0].toObject() != undefined){
              jsonObject.article_id = articles[0].toObject()._id;
              jsonObject.article_content = articles[0].toObject().article_content;
              jsonObject.content_type = articles[0].toObject().content_type;
            }
            responseArray.push(jsonObject);
            // JsonObject
            // console.log(values);
            call();
          });
        });

      });
      async.parallel(asyncTask,function(){
      callback(responseArray);
      });
  });
}


exports.getArticles = function(topicId,range,callback){
  //range will be in format of 10_12
  var responseArray = new Array();
  var ranges = range.split("_");
  var initial = Number.parseInt(ranges[0]);
  var final = Number.parseInt(ranges[1]);
  var query = articleModel.find({'topic_id':topicId}).sort('-createdOn').select(" article_content publishedBy createdOn content_type").skip(initial).limit(final);
  query.exec(function(err,values){
    var asyncTask = [];
    values.forEach(function(item){
    var jsonObject  = new Object();
    asyncTask.push(function(call){

      userModel.find({'_id':item.toObject().publishedBy},function(err,users){
        jsonObject._id = item.toObject()._id;
        jsonObject.username = users[0].firstName;
        jsonObject.published_by = item.toObject().publishedBy;
        jsonObject.content_type = item.toObject().content_type;
        jsonObject.article_content = item.toObject().article_content;
        jsonObject.created_on = item.toObject().createdOn;
        responseArray.push(jsonObject);
        call();
      });


      });
    });
    async.parallel(asyncTask,function(){
    callback(responseArray);
    });
  });
}

exports.getArticleByArticleId = function(articleId,callback){
  var query = articleModel.find({'_id':articleId}).select("content_type article_content publishedBy createdOn");
  query.exec(function(err,value){
    callback(value);
  });
}
