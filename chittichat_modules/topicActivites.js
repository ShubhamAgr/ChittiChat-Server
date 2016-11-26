var mongoose = require('mongoose');
var fs = require('fs');
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

exports.newArticle = function(userId,topicId,marticle_content,socket,callback){
 var id = new mongoose.Types.ObjectId;
 var newArticle = new articleModel({
    _id:mongoose.Types.ObjectId(id),
    topic_id:topicId,
    publishedBy:userId,
    createdOn:Date.now(),
    article_content:marticle_content,
    content_type:"texts"
  },{collection:'articles'});
  newArticle.save(function(err,newArticle){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      topicModel.findByIdAndUpdate(topicId,{$addToSet:{"articles":{'_id':mongoose.Types.ObjectId(id)}}},{safe:true,upsert:true},function(err){
      if(err){
        callback({"message":"unsuccessful"});
      }else{
        // io.to(req.body.room).emit('newarticle',{"articleId":newArticle[0].toObject()._id});
        userModel.findByIdAndUpdate(userId,{$addToSet:{"myarticles":id},safe:true,upsert:true},function(err){
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

exports.newImage = function(req,io,callback){
var form = new multiparty.Form();
var path = "../static-Files/images";
form.uploadDir = "../public/images";
form.parse(req,function(err,fields,files){
  if(err) {
    callback(false);
  }else {
      Object.keys(fields).foreach(function(name) {
        console.log('file recieved'+name);
      });
      Object.keys(files).forEach(function(name){
        console.log('file recieved'+name);
        var imageId = new mongoose.Types.ObjectId;
        fs.rename(path+"/"+name,path+"/"+imageId,function(err){
          if(err){
            callback(false);
          }else{
            var newImage = new imageModel({
                _id:mongoose.Types.ObjectId(imageId),
                topic_id:req.body.topicId,
                publishedBy:req.body.user,
            });
            newImage.save(function(err,newImage){
              topicModel.findByIdAndUpdate(req.body.topicId,{$addToSet:{"images":newImage[0].toObject()._id}},{safe:true,upsert:true},function(err){
                io.to(req.body.room).emit('newimage',{"ImageId":newImage[0].toObject()._id});
                callback(true);
              });
            });
          }
        });
      });
    }
});
}
exports.newAudio = function(req,io,callback){
  var form = new multiparty.Form();
  var path = "../static-Files/audios";
  form.uploadDir = "../public/audios";
  form.parse(req,function(err,fields,files){
    if(err) {
      callback(false);
    }else {
        Object.keys(fields).foreach(function(name) {
          console.log('file recieved'+name);
        });
        Object.keys(files).forEach(function(name){
          console.log('file recieved'+name);
          var audioId = new mongoose.Types.ObjectId;
          fs.rename(path+"/"+name,path+"/"+audioId,function(err){
            if(err){
              callback(false);
            }else{
              var newAudio = new audioModel({
                _id:mongoose.Types.ObjectId(audioId),
                topicId:req.body.topicId,
                publishedBy:req.body.userId
              });
              newAudio.save(function(err,newAudio){
                topicModel.findByIdAndUpdate(req.body.topicId,{$addToSet:{"audios":newAudio[0].toObject()._id}},{safe:true,upsert:true},function(err){
                  io.to(req.body.room).emit('newaudio',{"audioId":newAudio[0].toObject()._id});
                  callback(true);
                });
              });
            }
          });
        });
    }
  });
}
exports.newVideo = function(req,io,callback){
  var form = new multiparty.Form();
  var path = "../static-Files/videos";
  form.uploadDir = "../public/videos";
  form.parse(req,function(err,fields,files){
    if(err) {
      callback(false);
    }else {
        Object.keys(fields).foreach(function(name) {
          console.log('file recieved'+name);
        });
        Object.keys(files).forEach(function(name){
          console.log('file recieved'+name);
          var videoId = new mongoose.Types.ObjectId;
          fs.rename(path+"/"+name,path+"/"+videoId,function(err){
            if(err){
              callback(false);
            }else{
              var newVideo = new videoModel({
                _id:mongoose.Types.ObjectId(videoId),
                topicId:req.body.topicId,
                publishedBy:req.body.userId
              });
              newVideo.save(function(err,newVideo){
                topicModel.findByIdAndUpdate(req.body.topicId,{$addToSet:{"videos":newVideo[0].toObject()._id}},{safe:true,upsert:true},function(err){
                  io.to(req.body.room).emit('newvideo',{"video_id":newVideo[0].toObject()._id});
                  callback(true);
                });
              });
            }
          });
        });
    }
  });
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
  var ranges = range.split("_");
  var initial = Number.parseInt(ranges[0]);
  var final = Number.parseInt(ranges[1]);
  var query = articleModel.find({'topic_id':topicId}).sort('-createdOn').select("content_type article_content").skip(initial).limit(final);
  query.exec(function(err,values){
    callback(values);
  });
}
