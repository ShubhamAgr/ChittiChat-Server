var createTopic = require('../chittichat_modules/createTopic');
var postContent = require('../chittichat_modules/postContent');
exports.module = function(app,io,socketMap){
  app.post("/newTopic",function(req,res){
      createTopic.newTopic(req,socket,function(response){
        res.status(200).json(response);
      });
  });
  app.get("/allTopics/:token/:groupId",function(req,res){

  });
  app.get("/topicsWithArticle/:token/:groupId",function(req,res){

  });
  app.get("/articles/:token/:topicId/:range",function(req,res){

  });
  app.post("/article",function(req,res){

  });
  app.post("/image",function(req,res){

  });
  app.post("/audio",function(req,res){

  });
  app.post("/video",function(req,res){

  });

}
