var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var userModel = require('../models/users');
var secretKey = require('../config/secretKey');
exports.verify = function(token,callback) {
  secretKey(function(secretKey){
    let userId = jwt.verify(token,secretKey).foo;//checkout the foo...
    userModel.find({_id:userId},function(err,user){
      if(err){
        callback("message":"error");
      }
      else if(user[0].length != 0){
        callback("message",userId);
      }else{
        callback("message":"false");
      }
    });
  });
}
