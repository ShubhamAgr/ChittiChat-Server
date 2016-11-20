var mongoose = require('mongoose');
var userModel = require('../models/users');
var groupModel = require('../models/groups');

exports.newgroup = function(userId,req,callback){
  var userId = userId;
  var id = new mongoose.Types.ObjectId;
  var newGroup = new groupModel({
    _id:mongoose.Types.ObjectId(id),
    group_name:req.body.group_name,
    group_admin:userId,//can give problem
    group_about:req.body.group_introduction,
    group_category:req.body.group_category,
    knock_knock_question:req.body.knock_knock_question
  },{collection:'groups'});
  newGroup.save(function(err,newGroup){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      //data to add the groups in the account of administrator or creater...
      userModel.findByIdAndUpdate(userId,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"administrator"}}},{safe:true,upsert:true},function(err){
        if(err){
          callback({"message":"unsuccessful"});
        }else{
          callback({"message":"successful"});
        }
        });
      }
    });
  }

exports.addMember = function(){

}
exports.removeMember = function(){

}
exports.addAdmin = function(){

}
exports.removeAdmin = function(){

}
exports.updateProfilePicture = function(){

}
exports.updateIsOpen = function(){

}
exports.updateknock_knockQuestion = function(){

}
exports.changeGroupName = function(){

}
exports.addNewRequest = function(userId,groupId,knock_knock_answer,callback){
    var newRequests = {"by":userId,"knock_knock_answer":knock_knock_answer};
    userModel.findOneAndUpdate({'_id':groupId},{$addToSet:{"pending_join_requests":newRequests}},{safe:true,upsert:true},function(err,groups){
    if(err){
      callback({"message":"unsuccessful"});

    } else {
      callback({"message":"successful"});
    }
  });
}
exports.followGroups = function(userId,groupId,callback){
   userModel.findByIdAndUpdate(userId,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"follower"}}},{safe:true,upsert:true},function(err){
     if(err){
       callback({"message":"unsuccessful"});
     }else{
       groupModel.findByIdAndUpdate(groupId,{$addToSet:{"followers":userId}},{safe:true,upsert:true},function(err){
         if(err){
           callback({"message":"unsuccessful"});
         }else{
           callback({"message":"successful"});
         }
       });
     }
   });
}

exports.unfollowGroups = function(userId,groupId,callback){
  userModel.findByIdAndUpdate(userId,{$pull:{"groups":{_id:mongoose.Types.ObjectId(groupId)}}},{safe:true,upsert:true},function(err){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      groupModel.findByIdAndUpdate(groupId,{$pull:{"followers":req.body.userId}},{safe:true,upsert:true},function(err){
        if(err){
          callback({"message":"unsuccessful"});
        }else{
          callback({"message":"successful"});
        }
      });
    }
  });
}
