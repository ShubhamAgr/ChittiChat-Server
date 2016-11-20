var userActivities = require('./routes/userActivities');
var groupActivites = require('./routes/groupActivities');
var topicActivites = require('./routes/topicActivities')
var search = require('./routes/search');
module.exports = function(app,io,db,socketMap) {
  userActivities(app,io,socketMap);
  app.get('/',function(req,res){
    res.status(200).send("This request is for Home Page");
  });
  app.get('*',function(req,res){
    res.status(404).send("Page Not Found");
  });
  app.post('*',function(req,res){
    res.status(404).send("Page Not Found");
  });
}
