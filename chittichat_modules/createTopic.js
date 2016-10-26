var mongoose = require('mongoose');
var groupModel = require('../models/groups');
var topicModel = require('../models/topics');

exports.newTopic = function(req,socket,callback){
  var id :new mongoose.Types.ObjectId;
  var newTopic : new topicModel({
    _id:mongoose.Types.ObjectId(id);
    groupId:req.body.groupId,
    topic_about:req.body.topic_about,
    topic_Detail:req.body.topic_Detail,
    createdBy:req.body.userId,
  },collection:'topics');
  newTopic.save(function(err,newTopic){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      groupModel.findByIdAndUpdate(req.body.groupId,{$addToSet:{"group_topics":newTopic[0].toObject()._id}},{safe:true,upsert:true},function(err){
      if(err){
        callback({"message":"unsuccessful"});
      }else{
        socket.to(req.body.room).emit("newTopic",{"topicId":id,"userId":req.body.userId});
        callback({"message":"successful"});
      }
    });
    }
  });
}
