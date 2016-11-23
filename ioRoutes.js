var roomActivity = require('./routes/roomActivites');
var middleware = require('socketio-wildcard')();
var verifyToken = require('./chittichat_modules/verifyToken');

module.exports = function(app,io,socketMap){
  io.use(middleware);
  io.on('connection',function(socket){
      console.log("socket connected");
    // socket.emit('true');

    roomActivity(io,socket,socketMap);

    socket.on('Auth',function(body){
    //   verifyToken.verify(body.token,function(found){
    //   if(found != "false"){
        socketMap.set("userId",socket);
        console.log(socketMap);
    //     socket.emit('IsAuthorized',{"Response":true});
    //   }else{
    //     socket.emit('IsAuthorized',{"Response":false});
    //   }
    // });
    });
    socket.on('joinRoom',function(body){
       socket.join(body.room_id);
       console.log("Room Joining")
       socket.emit('onJoinRequest',{"Response":true});
    });
    socket.on("error",function(body){
      console.log(body);
    })
    socket.on('leaveRoom',function(body){
          console.log("leaving rooms");
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

    socket.on('onTyping',function(body){
        io.to(body.groupId).emit({"Response":body.username+"is typing..."});
    });

    socket.on('stopTyping',function(body){
         io.to(body.groupId).emit({"Reponse":true});
    });

    // socket.on('*', function(body){
    //   socket.emit("error",{"Response":"404"});
    // });

    socket.on('disconnect',function(body){
      // verifyToken.verify(body.token,function(found){
      // if(found != "false"){
        socketMap.delete("userId");
        console.log("Socket disconnected");
      //   socket.emit('IsDisconnected',{"Response":true});
      // }else{
      //   socket.emit('IsDisconnected',{"Response":true});
      // }
      // });
    });

  });
}
