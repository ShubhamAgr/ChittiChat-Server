var login = require('../chittichat_modules/login');
var signup = require('../chittichat_modules/signup');

module.exports = function(app,io,socketMap){
  app.post('/loginWithFacebook',function(req,res){
      
       });
  app.post('/loginWithEmail',function(req,res){
    // console.log(req);
    login.loginWithEmail(req,function(found){
      res.status(200).json(found);
    });
  });
  app.post('/loginWithUsername',function(req,res){
      console.log(req.body.username);
      login.loginWithUsername(req,function(found){
        res.status(200).json(found);
      });
    });

    app.get('/signupWithFacebook',function(req,res){
      signup(req,true,function(response){
        res.status(200).json(response);
      });
    });
    app.get('/signupWithChittiChat',function(req,res){
      signup(req,false,function(response){
        res.status(200).json(response);
      });
    });
}
