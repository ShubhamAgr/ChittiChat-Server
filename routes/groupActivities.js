var verifyToken = require('../chittichat_modules/verifyToken');
var showGroups = require('../chittichat_modules/showGroups');
var groupActivity = require('../chittichat_modules/groupActivites');

module.exports = function(app,io,socketMap){
  app.post('/newGroup',function(req,res){
      verifyToken.verify(req.body.token,function(found) {
      if(found != "false") {
        groupActivity.newgroup(found,req,function(response){
          console.log(response);
          res.status(200).json(response);
        });
      }
    });

  });
app.get('/getGroups/:range',function(req,res){
  groupActivity.getGroups(req.params.range,function(response){
    console.log(response);
    res.status(200).json(response);
  });
});

app.get('/getGroupExists/:group_name',function(req,res){
  groupActivity.isGroupExists(req.params.group_name,function(response){
    res.status(200).json(response);
  });
});
  app.post('/accept_request',function(req,res){
    verifyToken.verify(req.body.token,function(found){
      if(found != "false"){
        groupActivity.accept_request(req.body.group_id,req.body.requested_by,function(response){
          console.log(response);
          res.status(200).json(response);
        });
      }
    });
  });

  app.post('/deny_request',function(req,res){
     verifyToken.verify(req.body.token,function(found){
       if(found != "false"){
        groupActivity.deny_request(req.body.group_id,req.body.requested_by,function(response){
            res.status(200).json(response);
        });
       }

     });
  });
  app.post('/newRequest',function(req,res){
      verifyToken.verify(req.body.token,function(found){
        if(found != "false") {
          groupActivity.addNewRequest(found,req.body.group_id,req.body.username,req.body.answer,io,socketMap,function(response){
            console.log(response);
            res.status(200).json(response);
          });
        }
      });
  });
  app.get('/followGroup/:token/:groupid',function(req,res){
    verifyToken.verify(req.params.token,function(found){
        if(found != "false") {
          groupActivity.followGroups(found,req.params.groupid,function(response){
              res.status(200).json(response);
          });
        }
    });
  });
  app.get('/requests/:groupid',function(req,res){
      groupActivity.requests(req.params.groupid,function(response){
        console.log(response);
        res.status(200).json(response);
      });
  });
  app.get('/unfollowGroup/:token/:groupid',function(req,res){
    verifyToken.verify(req.params.token,function(found){
      if(found != "false") {
        groupActivity.unfollowGroups(found,req.params.groupid,function(response){
          res.json(response);
        });
      }
    })
  });

  app.get('/groups/:token',function(req,res){

    verifyToken.verify(req.params.token,function(found){
      if(found != "false"){
        showGroups(found,function(response){
            res.status(200).json(response);
        });
      }
    });
  });
  app.get('/groupDetail/:token/:groupId',function(req,res){
      verifyToken.verify(req.params.token,function(found){
          groupActivity.groupDetail(req.params.groupId,function(response){
            res.status(200).json(response);
          });
      });
  });
  app.get('/members/:token/:groupId',function(req,res){
      verifyToken.verify(req.params.token,function(found){

      });
  });
  app.get('/join/:token/:groupId',function(req,res){
    verifyToken.verify(req.params.token,function(found){

    });
  });

  app.get('/leave/:token/:groupId',function(req,res){
    verifyToken.verify(req.params.token,function(found){

    });
  });
  app.post('/updateGroupProfilepic',function(req,res){
    groupActivity.updateGroupPicture(req,function(response){
      res.status(200).json(response);
    });
  });

  app.get('/pushNotification',function(req,res){

    // io.sockets.emit('notification',{"notification":"this is notification"});
    if(io.sockets.sockets[socketMap.get("58c457f71fd09234a5913f29")]!=undefined){
      console.log("shhhhhhhhhhhhhhhhhhhhhh");
        console.log(io.sockets.sockets[socketMap.get("58c457f71fd09234a5913f29")]);
        // io.sockets.sockets[socketMap.get("58c457f71fd09234a5913f29")].emit('notification',{"notification":"this is notification"});
        io.sockets.sockets[socketMap.get("58c457f71fd09234a5913f29")].emit('new_message',{"username":"Shubham","groupname":"lllllll","message":"messaagessdfs"});
        io.sockets.sockets[socketMap.get("58c457f71fd09234a5913f29")].emit('new_topic',{"group_name":"group_name","topic_name":"topic_name"});
        io.sockets.sockets[socketMap.get("58c457f71fd09234a5913f29")].emit('on_join_request',{"group_name":"group_name","username":"username","answer":"answerdjfls","groupId":"1234"});
    }else{
        console.log("Socket not connected");
    }
  //   if(socketMap.get("58c457f71fd09234a5913f29") != undefined){
  //   // console.log(socketMap.get("58c457f71fd09234a5913f29"));
  //   // socketMap.get("58c457f71fd09234a5913f29").emit('notification',{"notification":"this is notification"});
  // }else{
  //   console.log("socket not connected");
  // }

    res.status(200).json({"message":"success"});
  });
}
