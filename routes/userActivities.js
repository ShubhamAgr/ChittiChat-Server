var login = require('../chittichat_modules/login');
var signup = require('../chittichat_modules/signup');
var isUserAlreadyExists = require('../chittichat_modules/isUserAlreadyExists');
module.exports = function(app,io,socketMap){
  app.post('/loginWithFacebook',function(req,res){
    login.loginWithFacebook(req,function(found){
        res.status(200).json(found);
      });
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

    app.post('/signupWithFacebook',function(req,res){
      signup.newUser(req,true,function(response){
        if(response == "successful"){
          login.loginWithFacebook(req,function(found){
              res.status(200).json(found);
          });
        }else{
          res.status(200).json({"message":"something went wrong"});
        }
        });
      });
    app.post('/signupWithChittiChat',function(req,res){
      signup(req,false,function(response){

        res.status(200).json(response);
      });
    });
}
