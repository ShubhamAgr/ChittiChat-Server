var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var userModel = require('../models/users');
var secretKey = require('../config/secretKey');
exports.verify = function(token,callback) {
  secretKey(function(secretKey){

    var userId = jwt.verify(token,secretKey).foo;//checkout the foo...
    userModel.find({_id:userId},function(err,user){
      if(err){
        callback("error");
        //assert true;
      }
      else if(user[0].length != 0){
        callback(userId);
      }else{
        callback("false");
      }
    });
  });
}
