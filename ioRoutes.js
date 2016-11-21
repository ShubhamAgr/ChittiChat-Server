var roomActivity = require('./routes/roomActivites');
var middleware = require('socketio-wildcard')();
var verifyToken = require('./chittichat_modules/verifyToken');

module.exports = function(app,io,socketMap){
  io.use(middleware);
  io.on('connection',function(socket){
    socket.emit('true');

    roomActivity(io,socket,socketMap);

    socket.on('Auth',function(body){
      verifyToken.verify(body.token,function(found){
      if(found != "false"){
        socketMap.set(userId,socket);
        socket.emit('IsAuthorized',{"Response":true});
      }else{
        socket.emit('IsAuthorized',{"Response":false});
      }
    });
    });

    socket.on('onTyping',function(body){
        socket.to(body.groupId).emit({"Response":body.username+"is typing..."});
    });

    socket.on('stopTyping',function(body){
         socket.to(body.groupId).emit({"Reponse":true});
    });

    socket.on('*', function(body){
      socket.emit("error",{"Response":"404"});
    });

    socket.on('disconnect',function(body){
      verifyToken.verify(body.token,function(found){
      if(found != "false"){
        socketMap.delete(found);
        socket.emit('IsDisconnected',{"Response":true});
      }else{
        socket.emit('IsDisconnected',{"Response":true});
      }
      });
    });

  });
}
