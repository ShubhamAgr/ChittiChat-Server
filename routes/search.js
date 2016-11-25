
module.exports = function(MongoClient,url,app){

app.post("/search",function(req,res){
  MongoClient.connect(url,function(err,db){
//   db.ensureIndex('articles',{"$**":"text"},function(err,indexname){
//     // assert.equal(null,err);
//     console.log(indexname);
//     // db.collection('users').find({"$text":{"$search":req.body.query}}).toArray(function(err,items){
//     //   res.status(200).json(items);
//     //   db.close();
//     // });
//     db.collection('articles').find({"$text":{"$search":req.body.query}}).toArray(function(err,items){
//
//       res.status(200).json(items);
//       db.close();
//     });
//   });

db.collection('users').find({
      "$text":{
        "$search":req.body.query
      }
    },
    {
      document:1,
      created:1,
      _id:1,
      textScore:{
        $meta:"textScore"
      }
    },
    {
    sort:{
      textScore:{
        $meta:"textScore"
      }
    }
  }).toArray(function(err,items){

    res.send(items);
    // res.send(pagelist(items));
  });

});
});
}
//
//     app.post("/search",function(req,res){
//
// });
