var mongoose  = require('mongoose');
var userModel = require('../models/users');
var eventEmitter = new events.EventEmitter();
var events  = require('events');
var fs = require("fs");
var bcrypt = require("bcryptjs");
exports.updateUserDetail = function(req,id,callback){
  var event = req.body.eventList.split(",");
  try{
    for(x in eventList){
      eventEmitter.emit(event[x]);
    }
    callback(true);
  }catch(err){
    console.log("error occoured while updating the user detail"+err);
    callback(false);
  }
  eventEmitter.on("updateFirstName",function(){
      userModel.findOneAndUpdate({"_id":id},{"firstName":req.body.firstName},{safe:true,upsert:true},function(err){
        if(err){
          throw(err);
        }
      });
  });
  eventEmitter.on("updateMiddleName",function(){
     userModel.findOneAndUpdate({"_id":id},{"middleName":req.body.middleName},{safe:true,upsert:true},function(err){
       if(err){
         throw(err);
       }
     });
  });
  eventEmitter.on("updateLastName",function(){
      userModel.findOneAndUpdate({"_id":id},{"lastName":req.body.lastName},{safe:true,upsert:true},function(err){
        if(err){
          throw(err);
        }
      });
  });

  eventEmitter.on("updateProfilePic",function(){
    let form = new multiparty.Form();
    let path = "../public/profilepic";
    form.uploadDir = "../public/profilepic";
    form.parse(req,function(err,fields,files){
        if(err){
          callback(false);
        }else{
          Object.keys(fields).forEach(function(name) {
          console.log('got field named ' + name);
        });

        Object.keys(files).forEach(function(name) {
          let imageId =req.body.userId;
          fs.rename(path+"/"+name,path+"/"+imageId,function(err){
              userModel.findByIdAndUpdate(req.body.userId,{"profile_Pic_url":path+"/"+imageId},{safe:true,upsert:true},function(err){
                callback(true);
              });
            });
          });
        }
      });
  });

  eventEmitter.on("updatePassword",function(){
    //pre check that user is authenticated or not check that is has send correct password or not....
    const salt_r = bcrypt.genSaltSync(10);//slow the process so change it to async...
    const hash_r = bcrypt.hashSync(req.body.password,salt_r);
    userModel.findOneAndUpdate({"_id":id},{"password":hash_r},{safe:true,upsert:true},function(err){
      if(err){
        throw(err);
      }
    });

  });
  eventEmitter.on("leaveGroups",function(){

  });


}
