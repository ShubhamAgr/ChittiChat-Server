var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.ObjectId;
var audioSchema = new schema({
  _id:id,
  topic_id:{type:String},
  published_timestamp:{type:String,default:Date.now()},
  publishedBy:{type:String},
  audio_url:{type:String,default:null},
  upvotes:{type:String},//numberoftimes
  upvotedBy:[String],
  shares:{types:String},//numberoftimes
  sharedBy:[String],
  reportAbused:{type:Boolean,default:false}
},{collection:"audios"});
module.exports = mongoose.model("audio",audioSchema);
