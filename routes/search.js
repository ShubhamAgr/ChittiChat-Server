
module.exports = function(app,db){

app.post("/search",function(req,res){
  db.ensureIndex('users',{"$**":"text"},function(err,indexname){
    assert.equal(null,err);
    console.log(indexname);
    db.collection('users').find({"$text":{"$search":req.body.query}}).toArray(function(err,items){
      console.log(items);
    });
  });
});

  //   app.post("/search",function(req,res){
//     db.collection('users').find({
//       "$text":{
//         "$search":req.body.query
//       }
//     },
//     {
//       document:1,
//       created:1,
//       _id:1,
//       textScore:{
//         $meta:"textScore"
//       }
//     },
//     {
//     sort:{
//       textScore:{
//         $meta:"textScore"
//       }
//     }
//   }).toArray(function(err,items){
//     res.send(items);
//     // res.send(pagelist(items));
//   })
// });
}
