var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var userModel = require('../models/users')
exports.newUser = function(req,IsByFacebook,callback){
  var id = new mongoose.Types.ObjectId;

  var newUser;
  if(IsByFacebook){
    newUser = new userModel({
      _id:mongoose.Types.ObjectId(id),
      facebook_id:req.body.facebook_id,
      firstName:req.body.firstName,
      lastName:req.body.lastName
    },{collection:'user'})
  }else{
    const salt = bcrypt.genSaltSync(10);//slow the process so change it to async...
    const hash = bcrypt.hashSync(req.body.password,salt);
    newUser = new userModel({
      _id:mongoose.types.ObjectId(id),
      email:req.body.email,
      username:req.body.username,
      password:hash,
      // firstName:req.body.firstName,
      // lastName:req.body.lastName,
    },{collection:'user'});
  }
  newUser.save(function(err,newUser){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      callback({"message":"successful"});

    }
  })
}
