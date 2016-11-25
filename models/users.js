var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.Types.ObjectId;
var userSchema = new schema({
  _id:id,
  facebook_id:{type:String,default:null},
  username:{type:String,default:null},
  password :{type:String,default:"Invalid"},
  email:{type:String,default:null},
  firstName:{type:String,default:null},
  lastName:{type:String,default:null},
  yearOfBirth:{type:String,default:null},
  chittichat_coins:{type:String,default:null},
  phone_number_primary:{type:String,default:null},
  phone_number_secondary:[String],
  profile_Pic_url :{type:String,default:"default"},
  status : {type:String,default:"chitti chitti chat chat"},
  interests : [String],
  groups:[{
    _id:id,
    role:{type:String}//follower,admin, member.
  }],
  group_invites:[String],
  groups_Followed:[String],
  groups_Admin:[String],
  groups_member:[String],
// to fetch the notification
  newTopic:[{
    groupId:{type:String},
    topicId:{type:String}
  }],
  newArticle:[{
      groupId:{type:String},
      topicId:{type:String},
      ArticleId:{type:String},
  }],
  myarticles:[String],
  myimages:[String],
  myvideos:[String],
  myaudios:[String],
  knowledge_Map:[{
    identity:[String],
    level_of_understanding:[String]
  }],
  pendingRequest:[String],
  createdOn:{type:Date,default:Date.now()}


},{collection:'users'});
	module.exports = mongoose.model('user',userSchema);
