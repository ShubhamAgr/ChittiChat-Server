var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.ObjectId;
var articleSchema = new schema({
  _id:id,
  topic_id:{type:String},
  created_on:{type:Date,default:Date.now()},
  published_by:{type:String},
  publisher_name:{type:String},
  content_type:{type:String},
  article_content:{type:String,default:null},
  upvotes:{type:String},//numberoftimes
  upvotedBy:[String],
  shares:{type:String},//numberoftimes
  sharedBy:[String],
  tags:[{
    content_name:{type:String},
    quantity:{type:String}
  }],
  reportAbused:{type:Boolean,default:false}
},{collection:"articles"});
module.exports = mongoose.model("article",articleSchema);
