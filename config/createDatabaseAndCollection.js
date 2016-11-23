module.exports = function(MongoClient,url){
  console.log("Checking for database and collections");
  MongoClient.connect(url,function(err,db){
    // console.log(database);
    db.collection('users',{ },function(err,coll){
    if(err != null) {
      db.createCollection("users",function(err,result){
        assert.equal(null,err);
        db.close();
      });
    }
    });
    db.collection("articles",{ },function(err,coll){
    if(err != null) {
      db.createCollection("articles",function(err,result){
        assert.equal(null,err);
        db.close();
      });
    }
    });
    db.collection("audios",{ },function(err,coll){
    if(err != null) {
      db.createCollection("audios",function(err,result){
        assert.equal(null,err);
        db.close();
      });
    }
    });
    db.collection("groups",{ },function(err,coll){
    if(err != null) {
      db.createCollection("groups",function(err,result){
        assert.equal(null,err);
        db.close();
      });
    }
    });
    db.collection("loginDetails",{ },function(err,coll){
    if(err != null) {
      db.createCollection("loginDetails",function(err,result){
        assert.equal(null,err);
        db.close();
      });
    }
    });
    db.collection("pictures",{ },function(err,coll){
    if(err != null) {
      db.createCollection("pictures",function(err,result){
        assert.equal(null,err);
        db.close();
      });
    }
    });
    db.collection("topics",{ },function(err,coll){
    if(err != null) {
      db.createCollection("topics",function(err,result){
        assert.equal(null,err);
        db.close();
      });
    }
    });
    db.collection("videos",{ },function(err,coll){
    if(err != null) {
      db.createCollection("videos",function(err,result){
        assert.equal(null,err);
        db.close();
      });
    }
    });
  });

}
