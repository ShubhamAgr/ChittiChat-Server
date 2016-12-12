var roomActivity = require('./routes/roomActivites');
var middleware = require('socketio-wildcard')();
var verifyToken = require('./chittichat_modules/verifyToken');
var jwt = require('jsonwebtoken');
module.exports = function(app,io,socketMap){
  io.use(middleware);
  io.on('connection',function(socket){
      console.log("socket connected");
    // socket.emit('true');
    // socketMap.set("shubham",socket);
    // console.log(socketMap.get("shubham"));
    roomActivity(io,socket,socketMap);

    socket.on('authorize',function(body){
      if(body.token != "null"){
        var decoded = jwt.verify(body.token,'abcdefghijklmnopqr/123@!@#$%');
        console.log(decoded.foo)
        userId = decoded.foo;
        socketMap.set(userId,socket);
        console.log("socket added to map");
        // console.log(socketMap.get(userId));
      }
    });
    socket.on('joinRoom',function(body){

       if(body.token != "null"){
         var decoded = jwt.verify(body.token,'abcdefghijklmnopqr/123@!@#$%');
         console.log(decoded.foo)
         userId = decoded.foo;
        //  socketMap.get(userId).join(body.room_id);
        socket.join(body.room_id);

         console.log("Room Joining")
         socket.emit('onJoinRequest',{"Response":true});
       }

    });
    socket.on("error",function(body){
      console.log(body);
    })
    socket.on('leaveRoom',function(body){
      if(body.token != "null"){
        var decoded = jwt.verify(body.token,'abcdefghijklmnopqr/123@!@#$%');
        console.log(decoded.foo)
        userId = decoded.foo;
        console.log("leaving rooms");
        // socketMap.get(userId).leave(body.room_id);
        socket.leave(body.room_id);
        socket.emit('onLeaveRequest',{"Response":true});
      }

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
    socket.on("input",function(body){
      console.log("abcdef");
      console.log(body.aa);
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
        console.log("Socket disconnected");

    });
    socket.on('app_close',function(body){
      if(body.token != "null"){
        var decoded = jwt.verify(body.token,'abcdefghijklmnopqr/123@!@#$%');
        console.log(decoded.foo)
        userId = decoded.foo;
        socketMap.delete(userId);
        console.log("Socket disconnected");
      }else{
        console.log("null token");
      }

      });
  });
}
