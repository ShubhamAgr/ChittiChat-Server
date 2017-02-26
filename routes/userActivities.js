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
        if(response.message == "successful"){
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
    app.get('/getCurrentVersionCode/:version_code',function(req,res){
      var force_update = false;
      var users_version_code = parseInt(req.params.version_code);
      var current_version_code = 5;
      if(users_version_code<current_version_code){
      force_update = true;
      }
      res.status(200).json({"current_version_code":current_version_code,"force_update":force_update});
    });

    app.get('/getSharingInfo',function(req,res){
      var ref = "abcdefghijklmn";
      var content_description ="Hello there, Follow my Group";
      var content_title = "ChittiChat -Android Application";
      var content_uri = "https://play.google.com/store/apps/details?id=in.co.nerdoo.com.chittichat.chittichat";
      res.status(200).json({"ref":ref,"content_description":content_description,"content_title":content_title,"content_uri":content_uri});
    });
}
