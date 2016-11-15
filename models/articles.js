var mongoose = require('mongoose');
var schema = mongoose.Schema;
var id = mongoose.Schema.ObjectId;
var articleSchema = new schema(){
  _id:id,
  topic_id:{type:String},
  published_timestamp:{type:String,default:Date.now()},
  publishedBy:{type:String},
  article_content:{type:String,default:null},
  article_image_url:{type:String,default:null},
  upvotes:{type:String},//numberoftimes
  upvotedBy:[String],
  shares:{type:String},//numberoftimes
  sharedBy:[String],
  tags:[{
    content_name:{type:String},
    quantity:{type:String}
  }],
  reportAbused:{type:Boolean,default:false}
},collection:"articles");
module.exports = mongoose.model("article",articleSchema);
