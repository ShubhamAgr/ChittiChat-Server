var createGroup = require('../chittichat_modules/createGroup');
var updateGroupDetail = require('../chittichat_modules/updateGroupDetail');
var
module.exports = function(app,io,socketMap){
  app.post("/newGroup",function(req,res){
      createGroup.newGroup(req,function(response){
        res.status(200).json(response);
      });
  });
  app.post("/newRequest",function(req,res){

  });
  app.get("/followGroup/:token/:groupId",function(req,res){
    var token =  req.params.token;
  });
  app.get("/unfollowGroup/:token/:groupId",function(req,res){

  });

  app.get("/groups/:token",function(req,res){

  });
  app.get("/members/:token/:groupId",function(req,res){

  });
  app.get("/join/:token/:groupId",function(req,res){

  });

  app.get("/leave/:token/:groupId",function(req,res){

  });
}
