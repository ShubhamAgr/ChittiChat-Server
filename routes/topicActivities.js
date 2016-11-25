var verifyToken = require('../chittichat_modules/verifyToken');
var topicActivity = require('../chittichat_modules/topicActivites');
module.exports = function(app,io,socketMap){
  app.post("/newTopic",function(req,res){
    console.log(req.body.token);
    verifyToken.verify(req.body.token,function(found) {
     if(found != "false") {
      topicActivity.newTopic(found,req,socketMap,function(response){
          res.status(200).json(response);
        });
      }
    });
  });
  app.get("/allTopics/:token/:groupId",function(req,res){
      verifyToken.verify(req.params.token,function(found){
        if(found != "false") {
          topicActivity.getTopics(req.params.groupId,function(response){
            res.status(200).json(response);
          });
        }
      });
  });
  app.get("/topicsWithArticle/:token/:groupId",function(req,res){
      verifyToken.verify(req.params.token,function(found){
        if(found != "false"){
        res.status(200).json(response);
        }
      });
  });
  app.get("/articles/:token/:topicId/:range",function(req,res){
    verifyToken.verify(req.params.token,function(found) {
      if(found != false){
          topicActivity.getArticles(req.params.topicId,req.params.range,function(response){
            res.json(response);
          });
      }
    });
      // res.status(200).json({"aa":"aa"});
  });
  app.post("/article",function(req,res){
      verifyToken.verify(req.body.token,function(found) {
        if(found != false){
            topicActivity.newArticle(found,req.body.topicId,req.body.topic_content,socketMap,function(response){
              res.status(200).json(response);
            });
        }
      });
  });
  app.post("/image",function(req,res){
        res.status(200).end();
  });
  app.post("/audio",function(req,res){
        res.status(200).end();
  });
  app.post("/video",function(req,res){
        res.status(200).end();
  });

}
