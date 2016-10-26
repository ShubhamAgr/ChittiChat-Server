var mongoose = require('mongoose');
var userModel = require('../models/users');
var groupModel = require('../models/groups');

exports.followGroups = function(userId,groupId,socket,callback){
   userModel.findByIdAndUpdate(userId,{$addToSet:{"groups_Followed":groupId}},{safe:true,upsert:true},function(err){
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
  userModel.findByIdAndUpdate(userId,{$pull:{"groups_Followed":groupId}},{safe:true,upsert:true},function(err){
    if(err){
      callback({"message":"error"});
    }else{
      groupModel.findByIdAndUpdate(groupId,{$pull:{"followers":userId}},{safe:true,upsert:true},function(err){
        if(err){
          callback({"message":"error"});
        }else{
          socket.emit("unfollower",{"groupId":groupId,"userId":userId});
          callback({"message":"true"});
        }
      });
    }
  });
}
