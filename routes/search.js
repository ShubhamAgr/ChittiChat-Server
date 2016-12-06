
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

// db.collection('users').find({
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
//
//     res.send(items);
//     // res.send(pagelist(items));
//   });

});
});

app.post('/searchGroups',function(req,res){
  MongoClient.connect(url,function(err,db){
    db.collection('groups').find({'group_name':{$regex:req.body.query,$options:"$i"}},{'group_name':1,'_id':true}).limit(2).sort({key:1}).toArray(function(err,results){
        console.log(results);
        res.json(results);
    });
  });
});

app.post('/searchUsersbyUsername',function(req,res){
  MongoClient.connect(url,function(err,db){
    db.collection('users').find({'username':{$regex:req.body.query,$options:"$i"}},{'_id':true}).limit(2).sort({key:1}).toArray(function(err,results){
        console.log(results);
        res.json(results);
    });
  });
});

app.post('/searchUsersbyName',function(req,res){
  MongoClient.connect(url,function(err,db){
    db.collection('users').find({'firstName':{$regex:req.body.query,$options:"$i"}},{'_id':true}).limit(2).sort({key:1}).toArray(function(err,results){
        console.log(results);
        res.json(results);
    });
  });
});

app.post('/searchTopicByHeading',function(req,res){

});

app.post('/searchTopicByDetail',function(req,res){

});

app.post('/searchGroupsByDetail',function(req,res){

});

app.post('/searchGroupsByGroupCategory',function(req,res){

});

}
