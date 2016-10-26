var mongoose = require('mongoose');
var fs = require('fs');
var articleModel = require('../models/articles');
var imageModel = require('../models/pictures');
var audioModel = require('../models/audio');
var videoModel = require('../models/videos')
var topicModel = require('../models/topics');
var multiparty = require('multiparty');
var util = require('util');
exports.newArticle = function(req,io,callback){
 let id = new mongoose.Types.ObjectId;
 let newArticle = new articleModel({
    _id:mongoose.Types.ObjectId(id);
    topic_id:req.body.topicId,
    publishedBy:req.body.userId,
    article_content:req.body.content
  });
  newArticle.save(function(err,newArticle){
    if(err){
      callback(false);
    }else{
      topicModel.findByIdAndUpdate(req.body.topicId,{$addToSet:{"articles":newArticle[0].toObject()._id}},{safe:true,upsert:true},function(err){
      if(err){
        callback(false);
      }else{
        io.to(req.body.room).emit('newarticle',{"articleId":newArticle[0].toObject()._id});
        callback(true);
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
        let imageId = new mongoose.Types.ObjectId;
        fs.rename(path+"/"+name,path+"/"+imageId,function(err){
          if(err){
            callback(false);
          }else{
            let newImage = new imageModel({
                _id:mongoose.Types.ObjectId(imageId),
                topic_id:req.body.topicId,
                publishedBy:req.body.user,
            });
            newImage.save(err,newImage){
              topicModel.findByIdAndUpdate(req.body.topicId,{$addToSet:{"images":newImage[0].toObject()._id}},{safe:true,upsert:true},function(err){
                io.to(req.body.room).emit('newimage',{"ImageId":newImage[0].toObject()._id});
                callback(true);
              });
            }
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
          let audioId = new mongoose.Types.ObjectId;
          fs.rename(path+"/"+name,path+"/"+audioId,function(err){
            if(err){
              callback(false);
            }else{
              let newAudio = new audioModel({
                _id:mongoose.Types.ObjectId(audioId),
                topicId:req.body.topicId,
                publishedBy:req.body.userId
              });
              newAudio.save(err,newAudio){
                topicModel.findByIdAndUpdate(req.body.topicId,{$addToSet:{"audios":newAudio[0].toObject()._id}},{safe:true,upsert:true},function(err){
                  io.to(req.body.room).emit('newaudio',{"audioId":newAudio[0].toObject()._id});
                  callback(true);
                });
              }
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
          let videoId = new mongoose.Types.ObjectId;
          fs.rename(path+"/"+name,path+"/"+videoId,function(err){
            if(err){
              callback(false);
            }else{
              let newVideo = new videoModel({
                _id:mongoose.Types.ObjectId(videoId),
                topicId:req.body.topicId,
                publishedBy:req.body.userId
              });
              newVideo.save(err,newVideo){
                topicModel.findByIdAndUpdate(req.body.topicId,{$addToSet:{"videos":newVideo[0].toObject()._id}},{safe:true,upsert:true},function(err){
                  io.to(req.body.room).emit('newvideo',{"video_id":newVideo[0].toObject()._id});
                  callback(true);
                });
              }
            }
          });
        });
    }
  });
}
