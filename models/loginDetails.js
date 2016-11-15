var mongoose  = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Scheama.Types.ObjectId;
var loginDetailSchema = new schema ({
  _id:id,
  loginWithfacebook:{
    isLogin:{type:Boolean,default:false},
    fb_token:{type:String,default:null},
    token:{type:String,default:null},
    timestamp:{type:String,default:Date.now()}
  },
  loginWithChittiChat:{
    isLogin:{type:Boolean,default:false},
    token:{type:String,default:null},
    timestamp:{type:String,default:Date.now()}
  }
},{collection:'loginDetailSchema'});
	module.exports = mongoose.model('loginDetails',loginDetailSchema);
