var createTopic = require('../chittichat_modules/createTopic');
var postContent = require('../chittichat_modules/postContent');
exports.module = function(app,io,socketMap){
  app.post("/newtopic",function(req,res){
      createTopic.newTopic(req,socket,function(response){
        res.status(200).json(response);
      });
  });
  app.get("/alltopic/:token/:groupId",function(req,res){

  });
  app.get("/articles/:token/:topicId/:range",function(req,res){

  });
  app.post("/postarticle",function(req,res){

  });
  app.post("/postimages",function(req,res){

  });
  app.post("/postaudio",function(req,res){

  });
  app.post("/videos",function(req,res){

  });
}
