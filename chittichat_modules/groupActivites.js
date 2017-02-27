var mongoose = require('mongoose');
var userModel = require('../models/users');
var groupModel = require('../models/groups');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var path = require('path');
exports.newgroup = function(userId,req,callback){
  var id = new mongoose.Types.ObjectId;
  groupModel.find({'group_name':new RegExp('\\b' + req.body.group_name + '\\b', 'i')},function(err,group){
    if(group.length != 0) {
  callback({"message":"unsuccessful","_id":"err"});
    }else{

  var newGroup = new groupModel({
    _id:mongoose.Types.ObjectId(id),
    group_name:req.body.group_name,
    group_admin:userId,//can give problem
    users:{_id:mongoose.Types.ObjectId(userId),"role":"administrator"},
    group_about:req.body.group_introduction,
    group_category:req.body.group_category,
    knock_knock_question:req.body.knock_knock_question
  },{collection:'groups'});
  newGroup.save(function(err,newGroup){
    if(err){
      callback({"message":"unsuccessful","_id":"err"});
    }else{
      //data to add the groups in the account of administrator or creater...
      userModel.findByIdAndUpdate(userId,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(id),"role":"administrator"}}},{safe:true,upsert:true},function(err){
        if(err){
          callback({"message":"unsuccessful","_id":"err"});
        }else{
          callback({"message":"successful","_id":newGroup.toObject()._id});
        }
        });
      }
    });
  }
});
  }

  exports.isGroupExists = function(group_name,callback) {

    groupModel.find({'group_name':new RegExp('\\b' + group_name + '\\b', 'i')},function(err,group){
      if(group.length != 0) {
        callback({"message":"true"});
      }else{
        callback({"message":"false"});
      }
    });
  }
  exports.getGroups = function(range,callback){
    //range will be in format of 10_12
    // var responseArray = new Array();
    var ranges = range.split("_");
    var initial = Number.parseInt(ranges[0]);
    var final = Number.parseInt(ranges[1]);
    var query = groupModel.find().sort('-created_on').select("group_name group_about group_category knock_knock_question").skip(initial).limit(final);
    query.exec(function(err,values){
    callback(values);
    });
  }
exports.groupDetail = function(groupId,callback){
  groupModel.find({"_id":groupId},function(err,group){
    var response = new Object();
    response._id = group[0].toObject()._id;
    response.name = group[0].toObject().group_name;
    response.pic_url = group[0].toObject().group_profilePicture;
    response.category = group[0].toObject().group_category;
    response.about = group[0].toObject().group_about;
    callback(response);
  });
}
exports.getKnockKnockQuestion = function(groupId,callback){
  groupModel.find({"_id":groupId},function(err,group){
    var response = new Object();
    response.knock_knock_question = group[0].toObject().knock_knock_question;
    callback(response);
  });
}
exports.removeMember = function(){

}
exports.addAdmin = function(){

}
exports.removeAdmin = function(){

}
exports.updateGroupPicture =  function(req,callback){
      var count = 0;
      var form = new multiparty.Form();
      var mypath;
      form.uploadDir = path.normalize('../media');
      var mytoken;
      var groupId;

      form.on('error',function(err){
        console.log("ERROR");
      });
      form.on('part',function(part){
        if(!part.filename){
          console.log('got field named'+part.name);
          part.resume();
        }
        if(part.filename){
          count++;
          console.log('got file named'+part.name);
          part.resume();
        }
        part.on('error',function(err){
         console.log("err");
        });
      });
      form.on('field',function(name,value){
        console.log(name+":"+value);
        if(name=='token'){
          var decoded = jwt.verify(value,'abcdefghijklmnopqr/123@!@#$%');
          console.log(decoded.foo)
          userId = decoded.foo;
        }else if(name=='groupId'){
          groupId = value;
        }
      });
      form.on('file',function(name,value){
        console.log(util.inspect(value, false, null));
        mypath = value.path;
      });
      form.on('close',function(){
        console.log(userId);
        console.log(groupId);
        fs.rename(mypath,path.normalize('../media')+"/"+groupId,function(err){
          if(err){
            console.log(err);
            callback({"message":"unsuccessful"});
        }else{
          groupModel.findByIdAndUpdate(groupId,{"group_profile_picture":groupId},{safe:true,upsert:true},function(err){
            if(err){
              callback({"message":"unsuccessful"});
            }else{
              callback({"message":"successful"});
            }
          });
          }
      });
    });
        form.parse(req);
  }
exports.updateIsOpen = function(){

}
exports.updateknock_knockQuestion = function(){

}
exports.changeGroupName = function(){

}
exports.addNewRequest = function(userId,groupId,username,knock_knock_answer,callback){
  userModel.find({'_id':userId},function(err,user){
    var userObject = user[0].toObject();
    if(userObject.groups.length != 0){
    for(var i=0;i<userObject.groups.length;i++){
      if((userObject.groups[i]._id==groupId && userObject.groups[i].role == "administrator")||(userObject.groups[i]._id==groupId && userObject.groups[i].role == "member")){
        console.log(userObject.groups[i]._id);
        callback({"message":"unsuccessful"});
        break;
      }else if(i==userObject.groups.length-1){
    var newRequests = {"by":userId,"username":username,"knock_knock_answer":knock_knock_answer};
    groupModel.findOneAndUpdate({'_id':groupId},{$addToSet:{"pending_join_requests":newRequests}},{safe:true,upsert:true},function(err,groups){
    if(err){
      console.log(err);
      callback({"message":"unsuccessful"});

    } else {
      //find all the admin and for each socket.emit the new join request ...
      callback({"message":"successful"});
    }
  });
}
}
}else{
  var newRequests = {"by":userId,"username":username,"knock_knock_answer":knock_knock_answer};
  groupModel.findOneAndUpdate({'_id':groupId},{$addToSet:{"pending_join_requests":newRequests}},{safe:true,upsert:true},function(err,groups){
  if(err){
    console.log(err);
    callback({"message":"unsuccessful"});

  } else {
    //find all the admin and for each socket.emit the new join request ...
    callback({"message":"successful"});
  }
});
}
});
}
exports.followGroups = function(userId,groupId,callback){
  userModel.find({'_id':userId},function(err,user){
    var userObject = user[0].toObject();
    if(userObject.groups.length != 0){
    for(var i=0;i<userObject.groups.length;i++){
      if(userObject.groups[i]._id==groupId){
        console.log(userObject.groups[i]._id);
        callback({"message":"unsuccessful"});
        break;
      }else if(i==userObject.groups.length-1){
        userModel.findByIdAndUpdate(userId,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"follower"}}},{safe:true,upsert:true},function(err){
          if(err){
            callback({"message":"unsuccessful"});
          }else{
           groupModel.findByIdAndUpdate(groupId,{$addToSet:{"users":{_id:mongoose.Types.ObjectId(userId),"role":"follower"}}},{safe:true,upsert:true},function(err){
              if(err){
                callback({"message":"unsuccessful"});
              }else{
                callback({"message":"successful"});
              }
            });
          }
       });
      }
    }
  }else{
    userModel.findByIdAndUpdate(userId,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"follower"}}},{safe:true,upsert:true},function(err){
      if(err){
        callback({"message":"unsuccessful"});
      }else{
       groupModel.findByIdAndUpdate(groupId,{$addToSet:{"users":{_id:mongoose.Types.ObjectId(userId),"role":"follower"}}},{safe:true,upsert:true},function(err){
          if(err){
            callback({"message":"unsuccessful"});
          }else{
            callback({"message":"successful"});
          }
        });
      }
   });

  }
  });
}
exports.unfollowGroups = function(userId,groupId,callback){
  userModel.findByIdAndUpdate(userId,{$pull:{"groups":{_id:mongoose.Types.ObjectId(groupId)}}},{safe:true,upsert:true},function(err){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      // groupModel.findByIdAndUpdate(groupId,{$pull:{"followers":userId}},{safe:true,upsert:true},function(err){
groupModel.findByIdAndUpdate(groupId,{$pull:{"users":{_id:mongoose.Types.ObjectId(userId)}}},{safe:true,upsert:true},function(err){
        if(err){
          callback({"message":"unsuccessful"});
        }else{
          callback({"message":"successful"});
        }
      });
    }
  });
}
exports.requests = function(groupId,callback){
var query = groupModel.find({'_id':groupId}).select('pending_join_requests.by pending_join_requests.knock_knock_answer pending_join_requests.username');
  query.exec(function(err,value){
    callback(value[0].toObject().pending_join_requests);
  });
}
exports.accept_request = function(groupId,requestedBy,callback){
  userModel.find({'_id':requestedBy},function(err,user){
    var userObject = user[0].toObject();
    if(userObject.groups.length != 0){
    for(var i=0;i<userObject.groups.length;i++){
      console.log(userObject.groups[i]._id);
      console.log(userObject.groups[i]._id==groupId);
      if(userObject.groups[i]._id==groupId && userObject.groups[i].role == "follower"){
        console.log(userObject.groups[i]._id);
        userModel.findByIdAndUpdate(requestedBy,{$pull:{"groups":{_id:mongoose.Types.ObjectId(groupId)}}},{safe:true,upsert:true},function(err){
          if(err){

          }else{
          groupModel.findByIdAndUpdate(groupId,{$pull:{"users":{_id:mongoose.Types.ObjectId(requestedBy)}}},{safe:true,upsert:true},function(err){
              if(err){

              }else{

                userModel.findByIdAndUpdate(requestedBy,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"member"}}},{safe:true,upsert:true},function(err){
                  if(err){
                    callback({"message":"unsuccessful"});
                  }else{
                    groupModel.findByIdAndUpdate(groupId,{$addToSet:{"users":{_id:mongoose.Types.ObjectId(requestedBy),"role":"member"}}},{safe:true,upsert:true},function(err){
                      if(err){
                        callback({"message":"unsuccessful"});
                      }else{
                        var deleteRequests = {"by":requestedBy};
                        groupModel.findByIdAndUpdate(groupId,{$pull:{"pending_join_requests":deleteRequests}},{safe:true,upsert:true},function(err){
                          if(err){
                            callback({"message":"unsuccessful"});
                          }else{
                            callback({"message":"successful"});
                          };
                      });
                    }

                });
              }
              });

              }
            });
          }
        });
        break;
      }else if(i==(userObject.groups.length-1)){
        userModel.findByIdAndUpdate(requestedBy,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"member"}}},{safe:true,upsert:true},function(err){
          if(err){
            callback({"message":"unsuccessful"});
          }else{
            groupModel.findByIdAndUpdate(groupId,{$addToSet:{"users":{_id:mongoose.Types.ObjectId(requestedBy),"role":"member"}}},{safe:true,upsert:true},function(err){
              if(err){
                callback({"message":"unsuccessful"});
              }else{
                var deleteRequests = {"by":requestedBy};
                groupModel.findByIdAndUpdate(groupId,{$pull:{"pending_join_requests":deleteRequests}},{safe:true,upsert:true},function(err){
                  if(err){
                    callback({"message":"unsuccessful"});
                  }else{
                    callback({"message":"successful"});
                  };
              });
            }

        });
      }
      });
      }
    }}else{
      userModel.findByIdAndUpdate(requestedBy,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"member"}}},{safe:true,upsert:true},function(err){
        if(err){
          callback({"message":"unsuccessful"});
        }else{
          groupModel.findByIdAndUpdate(groupId,{$addToSet:{"users":{_id:mongoose.Types.ObjectId(requestedBy),"role":"member"}}},{safe:true,upsert:true},function(err){
            if(err){
              callback({"message":"unsuccessful"});
            }else{
              var deleteRequests = {"by":requestedBy};
              groupModel.findByIdAndUpdate(groupId,{$pull:{"pending_join_requests":deleteRequests}},{safe:true,upsert:true},function(err){
                if(err){
                  callback({"message":"unsuccessful"});
                }else{
                  callback({"message":"successful"});
                };
            });
          }

      });
    }
    });
    }
  });
//   userModel.findByIdAndUpdate(requestedBy,{$addToSet:{"groups":{_id:mongoose.Types.ObjectId(groupId),"role":"member"}}},{safe:true,upsert:true},function(err){
//     if(err){
//       callback({"message":"unsuccessful"});
//     }else{
//       groupModel.findByIdAndUpdate(groupId,{$addToSet:{"users":{_id:mongoose.Types.ObjectId(requestedBy),"role":"member"}}},{safe:true,upsert:true},function(err){
//         if(err){
//           callback({"message":"unsuccessful"});
//         }else{
//           var deleteRequests = {"by":requestedBy};
//           groupModel.findByIdAndUpdate(groupId,{$pull:{"pending_join_requests":deleteRequests}},{safe:true,upsert:true},function(err){
//             if(err){
//               callback({"message":"unsuccessful"});
//             }else{
//               callback({"message":"successful"});
//             };
//         });
//       }
//
//   });
// }
// });
}
exports.deny_request = function(groupId,requestedBy,callback){
  var deleteRequests = {"by":requestedBy};
  groupModel.findByIdAndUpdate(groupId,{$pull:{"pending_join_requests":deleteRequests}},{safe:true,upsert:true},function(err){
    if(err){
      callback({"message":"unsuccessful"});
    }else{
      callback({"message":"successful"});
    }
  });
}
