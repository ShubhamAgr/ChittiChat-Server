/*Require node packages from node modules*/
var express = require('express');
var assert = require('assert');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
server.listen(3000);
console.log("server is listening at port 3000");
var db;
console.log(path.normalize('../media'));
/*constants*/
var socketMap = new Map();
const url = "mongodb://localhost:27017/Chittichat-alpha-test";//Chittichat-test"; //
mongoose.connect(url);
require('./config/createDatabaseAndCollection')(MongoClient,url);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/images', express.static(path.normalize('../media')));
app.use('/profilepic', express.static(__dirname + '/static-Files/profilepic'));
app.use('/videos', express.static(__dirname + '/static-Files/videos'));
app.use('/audios',express.static(__dirname+'static-Files/audios'));
require('./routes/search')(MongoClient,url,app);
require('./routes.js')(app,io,socketMap);
require('./ioRoutes.js')(app,io,socketMap);

// app.listen(3000,function(){
//   console.log("Chittchat Server is running at port:\t 3000");
// });
