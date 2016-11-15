var mongoose = require('mongoose');
var groupModel = require('../models/groups');

exports.newgroup = function(req,callback){
  var id = new mongoose.Types.ObjectId;
  var newGroup = new groupModel({
    _id:mongoose.Types.ObjectId(id),
    group_admin:req.body.admin,//can give problem
    group_about:req.body.motivation,
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
