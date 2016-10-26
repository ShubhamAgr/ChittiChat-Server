var mongoose = require('mongoose');
var userModel = require('../models/users')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var secret = "XYZ";
//pending to write the add to loginDetails... in each block....

exports.loginWithEmail = function(req,callback){
  userModel.find({'email':req.body.email},function(err,user){
    if(user.length != 0) {
      bcrypt.compare(req.body.password,user[0].toObject().password,function(err,res){
        if(res == true){
          var token = jwt.sign({foo:user[0].toObject()._id},secret);
          callback({"message":token});
        }else{
          callback({"message":"wrong password"});
        }
      });
    }else{
      callback({"message":"user not found"});
    }
  });
}
exports.loginWithUsername = function(req,callback){
  userModel.find({'username':req.body.username},function(err,user){
    if(user.length != 0) {
      bcrypt.compare(req.body.password,user[0].toObject().password,function(err,res){
        if(res == true){
          var token = jwt.sign({foo:user[0].toObject()._id},secret);
          callback({"message":token});
        }else{
          callback({"message":"wrong password"});
        }
      });
    }else{
      callback({"message":"user not found"});
    }
  });
}
exports.loginWithFacebook = function(req,callback) {
  userModel.find({'facebook_id':req.body.facebook_id},function(err,user){
    if(user.length != 0) {
      bcrypt.compare(req.body.password,user[0].toObject().password,function(err,res){
        if(res == true){
          var token = jwt.sign({foo:user[0].toObject()._id},secret);
          callback({"message":token});
        }else{
          callback({"message":"wrong password"});
        }
      });
    }else{
      callback({"message":"user not found"});
    }
  });
}
