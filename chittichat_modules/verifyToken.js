var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var userModel = require('../models/users');
// var secretKey = require('../config/secretKey');
var secretKey = "abcdefghijklmnopqr/123@!@#$%";
exports.verify = function(token,callback) {
  // secretKey(function(secretKey){
    console.log(token);
    var userId = jwt.verify(token,secretKey).foo;//checkout the foo...
    userModel.find({_id:userId},function(err,user){
      if(err){
        callback("error");
        //assert true;
      }
      else if(user.length != 0){
        callback(userId);
      }else{
        callback("false");
      }
    });
  // });
}
