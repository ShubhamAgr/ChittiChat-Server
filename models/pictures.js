var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.ObjectId;
var pictureSchema = new schema({
  _id:id,
  topic_id:{type:String},
  published_timestamp:{type:String,default:Date.now()},
  publishedBy:{type:String},
  image_url:{type:String,default:null},
  upvotes:{type:String},//numberoftimes
  upvotedBy:[String],
  shares:{types:String},//numberoftimes
  sharedBy:[String],
  reportAbused:{type:Boolean,default:false}
},{collection:"pictures"});

module.exports = mongoose.model("picture",pictureSchema);
