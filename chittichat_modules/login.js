var mongoose = require('mongoose');
var userModel = require('../models/users');
var loginDetails = require('../models/loginDetails')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var secret = "abcdefghijklmnopqr/123@!@#$%";
//pending to write the add to loginDetails... in each block....

exports.loginWithEmail = function(req,callback){
  userModel.find({'email':req.body.email},function(err,user){
    if(user.length != 0) {
      bcrypt.compare(req.body.password,user[0].toObject().password,function(err,res){
        if(res == true){
          var token = jwt.sign({foo:user[0].toObject()._id},secret);
            loginDetails.findOneAndUpdate({"_id":user[0].toObject()._id},{'loginWithChittiChat':{"isLogin":true,"token":token,"timestamp":Date.now()}},{safe:true,upsert:true},function(err){
              if(err){
                callback({"message":"something went wrong"});
              }else{
                callback({"message":token});
              }
            });

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
          loginDetails.findOneAndUpdate({'_id':user[0].toObject()._id},{'loginWithChittiChat':{"isLogin":true,"token":token,"timestamp":Date.now()}},{safe:true,upsert:true},function(err){
            if(err){
              callback({"message":"something went wrong"});
            }else{
              callback({"message":token});
            }
          });
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
          var token = jwt.sign({foo:user[0].toObject()._id},secret);
          //code for adding data to the login detail....
          loginDetails.findOneAndUpdate({'_id':user[0].toObject()._id},{'loginWithFacebook':{"isLogin":true,"fb_token":req.body.fb_token,"token":token,"timestamp":Date.now()}},{safe:true,upsert:true},function(err){
            if(err){
              callback({"message":"something went wrong"});
            }else{
              callback({"message":token});
            }
          });
    }else{
      callback({"message":"user not found"});
    }
  });
}
