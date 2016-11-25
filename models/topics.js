var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.ObjectId;
var topicSchema = new schema({
  _id:id,
  group_id:{type:String},
  topic_title:{type:String},
  topic_detail:{type:String},
  createdBy:{type:String},
  createdOn:{type:Date,default:Date.now()},
  reportAbused:{type:String,default:"0"},
  articles:[{
    _id:id,
    createdOn:{type:Date,default:Date.now()}
  }],
  pictures:[String],
  audios:[String],
  videos:[String],
},{collection:"topics"});

module.exports = mongoose.model("topic",topicSchema);
