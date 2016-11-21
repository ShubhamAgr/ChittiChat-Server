var mongoose = require('mongoose');
var groupModel = require('../models/groups');
module.exports = function(io,socket,socketMap){

  socket.on('joinRoom',function(body){
     socket.join(body.room_id);
     socket.emit('onJoinRequest',{"Response":true});
  });
  socket.on('leaveRoom',function(body){
       socket.leave(body.room_id);
      socket.emit('onLeaveRequest',{"Response":true});
  });

  socket.on('knockknock',function(body){
      groups.find({"_id":body.room_id},function(err,groups){
        if(err){
          socket.emit("error",{"Response":"unSuccessful"});
        }else{
          socket.emit('knockknockQuestion',{"Question":groups[0].toObject().knock_knock_question});
        }
      });
  });
}
