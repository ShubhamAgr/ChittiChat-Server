var userActivities = require('./routes/login');

module.exports = function(app,io,socketMap) {
  userActivities(app,io,socketMap);
  app.get('/',function(req,res){
    res.status(200).send("This request is for Home Page");
  });
  app.get('*',function(req,res){
    res.status(404).send("Page Not Found");
  });
}
