var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.Types.ObjectId;

var groupSchema = new schema({
  _id:id,
  group_name:{type:String},
  group_admin:[String],
  group_profilePicture:{type:String,default:"default"},
  group_about:{type:String},
  group_category:{type:String},
  group_topics:[String],
  followers:[String],
  members:[String],
  isOpen:{type:Boolean},
  knock_knock_question:{type:String},
  pending_join_requests:[{
    by:{type:String},
    agreedBy:{type:String},
    disagreedBy:{type:String},
    knock_knock_answer:{type:String}
  }]
},{collection:'groups'});
module.exports = mongoose.model('group',groupSchema);
