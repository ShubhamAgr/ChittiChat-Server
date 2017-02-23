var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.Types.ObjectId;

var groupSchema = new schema({
  _id:id,
  group_name:{type:String,unique:true},
  group_admin:[String],
  group_profilePicture:{type:String,default:"default"},
  group_about:{type:String,default:"Awsome Group By Awsome People"},
  group_category:{type:String,default:"misc"},
  group_topics:[String],
  users:[{
    _id:id,
    role:{type:String}//follower,admin, member.
  }],
  followers:[String],
  members:[String],
  isOpen:{type:Boolean,default:true},
  knock_knock_question:{type:String,default:"Tell us something interesing about yourself?"},
  pending_join_requests:[{
    by:{type:String},
    username:{type:String},
    agreedBy:{type:String},
    disagreedBy:{type:String},
    knock_knock_answer:{type:String}
  }]
},{collection:'groups'});
module.exports = mongoose.model('group',groupSchema);
