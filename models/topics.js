var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.ObjectId;
var topicSchema = new schema({
  _id:id,
  group_id:{type:String},
  topic_about:{type:String},
  topic_detail:{type:String},
  createdBy:{type:String},
  created_timestamp:{type:String,default:Date.now()},
  reportAbused:{type:String,default:"0"},
  articles:[String],
  pictures:[String],
  audios:[String],
  videos:[String],
},{collection:"topics"});

module.exports = mongoose.model("topic",topicSchema);
