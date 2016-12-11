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
        topicActivity.getTopicsWithArticle(req.params.groupId,function(response){
            res.status(200).json(response);
        })
        }
      });
  });

      app.get("/articles/:token/:topicId/:range",function(req,res){
verifyToken.verify(req.params.token,function(found) {
      if(found != false){
        console.log(req.params.topicId);
        console.log(req.params.range);

          topicActivity.getArticles(req.params.topicId,req.params.range,function(response){
            console.log(response);
            res.status(200).json(response);
          });
      }
    });
      // res.status(200).json({"aa":"aa"});
  });
  app.post("/article",function(req,res){

      verifyToken.verify(req.body.token,function(found) {
        if(found != false){
          console.log(req.body.topic_id+req.body.marticle);
            topicActivity.newArticle(found,req.body.topic_id,req.body.marticle,socketMap,io,function(response){
              res.status(200).json(response);
            });
        }
      });
  });
  app.post("/image",function(req,res){
    // verifyToken.verify(req.body.token,function(found) {
    //   if(found != false){
          topicActivity.newImage(req,socketMap,function(response){
            res.status(200).json(response);
          });
    //   }
    // });
  });
  app.post("/audio",function(req,res){
        res.status(200).end();
  });
  app.post("/video",function(req,res){
        res.status(200).end();
  });

}
