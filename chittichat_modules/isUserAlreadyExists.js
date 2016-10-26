var mongoose = require('mongoose');
var user = require('../models.users');
exports.isUserEmailExists = function(email,callback){
  user.find({'email':email},function(err,user){
    if(user.length != 0){
      callback(true);
    }else{
      callback(false);
    }
  });
}
exports.isUsernameExists = function(username,callback) {
  user.find({'username':username},function(err,user){
    if(user.length != 0) {
      callback(true);
    }else{
      callback(false);
    }
  });
}
exports.isfacebookIdExists = function(facebook_id,callback){
    user.find({'facebook_id':facebook_id},function(err,user){
      if(user.length != 0) {
        callback(true);
      }else{
        callback(false);
      }
    });
}
