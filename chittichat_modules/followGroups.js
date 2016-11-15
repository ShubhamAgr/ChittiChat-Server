var mongoose = require('mongoose');
var userModel = require('../models/users');
var groupModel = require('../models/groups');

exports.followGroups = function(userId,groupId,socket,callback){
   userModel.findByIdAndUpdate(userId,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"follower"}}},{safe:true,upsert:true},function(err){
     if(err){
       callback({"message":"error"});
     }else{
       groupModel.findByIdAndUpdate(groupId,{$addToSet:{"followers":userId}},{safe:true,upsert:true},function(err){
         if(err){
           callback({"message":"error"});
         }else{
           socket.emit("newFollower",{"groupId":groupId,"userId":userId});
           callback({"message":"true"});
         }
       });
     }
   });
}

exports.unfollowGroups = function(req,socket,callback){
  userModel.findByIdAndUpdate(userId,{$pull:{"groups":{_id:mongoose.Types.ObjectId(groupId)}}},{safe:true,upsert:true},function(err){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      groupModel.findByIdAndUpdate(groupId,{$pull:{"followers":req.body.userId}},{safe:true,upsert:true},function(err){
        if(err){
          callback({"message":"unsuccessful"});
        }else{
          socket.emit("unfollower",{"groupId":groupId,"userId":userId});
          callback({"message":"successful"});
        }
      });
    }
  });
}
