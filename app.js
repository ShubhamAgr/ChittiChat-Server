/*Require node packages from node modules*/
var express = require('express');
var assert = require('assert');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var db;
/*constants*/
const socketMap = new Map();
const url = "mongodb://localhost:27017/Chittichat-test"
mongoose.connect(url);
MongoClient.connect(url,function(err,database){
  db = database;
  db.collection('users',{ },function(err,coll){
  if(err != null) {
    db.createCollection("users",function(err,result){
      assert.equal(null,err);
    });
  }
  });
  db.collection("articles",{ },function(err,coll){
  if(err != null) {
    db.createCollection("articles",function(err,result){
      assert.equal(null,err);
    });
  }
  });
  db.collection("audios",{ },function(err,coll){
  if(err != null) {
    db.createCollection("audios",function(err,result){
      assert.equal(null,err);
    });
  }
  });
  db.collection("groups",{ },function(err,coll){
  if(err != null) {
    db.createCollection("groups",function(err,result){
      assert.equal(null,err);
    });
  }
  });
  db.collection("loginDetails",{ },function(err,coll){
  if(err != null) {
    db.createCollection("loginDetails",function(err,result){
      assert.equal(null,err);
    });
  }
  });
  db.collection("pictures",{ },function(err,coll){
  if(err != null) {
    db.createCollection("pictures",function(err,result){
      assert.equal(null,err);
    });
  }
  });
  db.collection("topics",{ },function(err,coll){
  if(err != null) {
    db.createCollection("topics",function(err,result){
      assert.equal(null,err);
    });
  }
  });
  db.collection("videos",{ },function(err,coll){
  if(err != null) {
    db.createCollection("videos",function(err,result){
      assert.equal(null,err);
    });
  }
  });
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/images', express.static(__dirname + '/static-Files/images'));
app.use('/profilepic', express.static(__dirname + '/static-Files/profilepic'));
app.use('/videos', express.static(__dirname + '/static-Files/videos'));
app.use('/audios',express.static(__dirname+'static-Files/audios'));
/*requiring my own configurations*/
// require('./routes.js')(app,io,socketMap);

app.listen(3000,function(){
  console.log("Chittchat Server is running at port:\t 3000");
});
