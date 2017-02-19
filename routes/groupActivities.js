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
          groupActivity.addNewRequest(found,req.body.group_id,req.body.username,req.body.answer,function(response){
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
}
