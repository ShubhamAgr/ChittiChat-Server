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

exports.newArticle = function(userId,topicId,topic_content,socket,callback){
 var id = new mongoose.Types.ObjectId;
 var newArticle = new articleModel({
    _id:mongoose.Types.ObjectId(id),
    topic_id:topicId,
    publishedBy:userId,
    article_content:topic_content
  },{collection:'articles'});
  newArticle.save(function(err,newArticle){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      topicModel.findByIdAndUpdate(topicId,{$addToSet:{"articles":id}},{safe:true,upsert:true},function(err){
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
exports.getTopics = function(){

}
exports.getTopicsWithArticle = function(){

}
exports.articles = function(topicId,range,callback){

}
