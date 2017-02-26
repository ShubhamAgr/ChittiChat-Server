var mongoose = require('mongoose');
var userModel = require('../models/users');
var groupModel = require('../models/groups');
var async = require('async');
var util = require('util');
module.exports = function(userId,callback) {
  userModel.find({'_id':userId},function(err,user){
    if(err){
      //assert true..;
    }else{
      var responseArray = new Array();
      var asyncTask = [];
      var groupsObject = user[0].toObject().groups;
      groupsObject.forEach(function(item){
        asyncTask.push(function(call){
          console.log(item._id);
          var query = groupModel.find({'_id':item._id}).select("group_name group_profile_picture group_about group_category");
          query.exec(function(err,value){
            var jsonObject  = new Object();
            jsonObject = value[0].toObject();
            jsonObject.role = item.role;
            // value[0].toObject().role = item.role;
            responseArray.push(jsonObject);
            call();
          });
        });
        // console.log(item._id);

      });
      async.parallel(asyncTask,function(){
        console.log("responseArray");
        console.log(responseArray);
        callback(responseArray);
      // callback(user[0].toObject().groups);
      });
      // console.log(user[0].toObject().groups);

    }
  });
}
