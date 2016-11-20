const roomActivity = require('./routes/roomActivites');
const middleware = require('socketio-wildcard')();

module.exports = function(io,socketMap){
  io.use(middleware);
  io.on('connection',function(socket){
    socket.emit('true');

    roomActivity(io,socket,socketMap);

    socket.on('Auth',function(body){
      var userId = body.userId;
      socketMap.set(userId,socket);

    });

    socket.on('onTyping',function(body){
//
    });

    socket.on('stopTyping',function(body){
//
    });

    socket.on('*', function(body){
      socket.emit("error",{"message","404"});
    });

    socket.on('disconnect',function(body){
      //get token...
      //fetch objectId from token
      //delete object..
      let userId = body.UserId;
      socketMap.delete(userId);
    })
  });
}
