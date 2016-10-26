var mongoose  = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Scheama.Types.ObjectId;
var loginDetailSchema = new schema ({
  _id:id,
  loginWithfacebook:{
    isLogin:{type:Boolean,default:false},
    token:{type:String,default:null},
    expire:{type:String,default:null},
  },
  loginWithChittiChat:{
    isLogin:{type:Boolean,default:false},
    token:{type:String,default:null},
    expire:{type:String,default:null},
  }
},{collection:'loginDetailSchema'});
	module.exports = mongoose.model('loginDetails',loginDetailSchema);
