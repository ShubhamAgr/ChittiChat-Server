var mongoose = require('mongoose');
var userModel = require('../models/users');

module.exports = function(userId,callback) {
  userModel.find({'_id':userId},function(err,user){
    if(err){
      //assert true..;
    }else{
      callback(user[0].toObject().groups);
    }
  });
}
