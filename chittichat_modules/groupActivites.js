var mongoose = require('mongoose');
var userModel = require('../models/users');
var groupModel = require('../models/groups');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var path = require('path');
exports.newgroup = function(userId,req,callback){
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
      callback({"message":"unsuccessful","_id":"err"});
    }else{
      //data to add the groups in the account of administrator or creater...
      userModel.findByIdAndUpdate(userId,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(id),"role":"administrator"}}},{safe:true,upsert:true},function(err){
        if(err){
          callback({"message":"unsuccessful","_id":"err"});
        }else{
          callback({"message":"successful","_id":newGroup.toObject()._id});
        }
        });
      }
    });
  }
exports.groupDetail = function(groupId,callback){
  groupModel.find({"_id":groupId},function(err,group){
    var response = new Object();
    response._id = group[0].toObject()._id;
    response.name = group[0].toObject().group_name;
    response.pic_url = group[0].toObject().group_profilePicture;
    response.category = group[0].toObject().group_category;
    response.about = group[0].toObject().group_about;
    callback(response);
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
exports.updateGroupPicture =  function(req,callback){
      var count = 0;
      var form = new multiparty.Form();
      var mypath;
      form.uploadDir = path.normalize('.../media');
      var mytoken;
      var groupId;

      form.on('error',function(err){
        console.log("ERROR");
      });
      form.on('part',function(part){
        if(!part.filename){
          console.log('got field named'+part.name);
          //fields content work
          // var imageId = new mongoose.Types.ObjectId;
          // console.log(imageId);
          // console.log(part);
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
        }else if(name=='groupId'){
          groupId = value;
        }
      });
      form.on('file',function(name,value){
        console.log(util.inspect(value, false, null));
        mypath = value.path;
      });
      form.on('close',function(){
        console.log(userId);
        console.log(groupId);
        fs.rename(mypath,path.normalize('.../media')+"/"+groupId,function(err){
          if(err){
            console.log(err);
            callback({"message":"unsuccessful"});
        }else{
          groupModel.findByIdAndUpdate(groupId,{"group_profilePicture":groupId},{safe:true,upsert:true},function(err){
            if(err){
              callback({"message":"unsuccessful"});
            }else{
              callback({"message":"successful"});
            }
          });
          }
      });
    });
        form.parse(req);
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
      //find all the admin and for each socket.emit the new join request ...
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
