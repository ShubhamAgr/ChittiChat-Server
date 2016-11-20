var createGroup = require('../chittichat_modules/createGroup');
var verifyToken = require('../chittichat_modules/verifyToken');
var showGroups = require('../chittichat_modules/showGroups');
var groupActivity = require('../chittichat_modules/groupActivites');

module.exports = function(app,io,socketMap){
  app.post("/newGroup",function(req,res){
      verifyToken.verify(req.body.token,function(found) {
      if(found != "false") {
        groupActivity.newGroup(userId,req,function(response){
          res.status(200).json(response);
        });
      }
      })

  });
  app.post("/newRequest",function(req,res){
      verifyToken.verify(req.body.token,function(found){
        if(found != "false") {
          groupActivity.addNewRequest(found,req.body.groupId,req.body.knock_knock_question,function(response){
            res.send(200).json(response);
          });
        }
      });
  });
  app.get("/followGroup/:token/:groupId",function(req,res){
    verifyToken.verify(req.params.token,function(req,res){
        if(found != "false") {
          groupActivites.followGroups(found,req.params.groupId,function(response){
              res.send(200).json(response);
          });
        }
    });
  });
  app.get("/unfollowGroup/:token/:groupId",function(req,res){
    verifyToken.verify(req.params.token,function(req,res){
      if(found != "false") {
        groupActivites.unfollowGroups(found,req.params.groupId,function(response){
          res.json(response);
        });
      }
    })
  });

  app.get("/groups/:token",function(req,res){

    verifyToken.verify(req.params.token,function(found){
      if(found != "false"){
        showGroups(found,function(response){
            res.send(200).json(response);
        });
      }
    });
  });
  app.get("/groupDetail/:groupId",function(req,res){

  });
  app.get("/members/:token/:groupId",function(req,res){

  });
  app.get("/join/:token/:groupId",function(req,res){

  });

  app.get("/leave/:token/:groupId",function(req,res){

  });
}
