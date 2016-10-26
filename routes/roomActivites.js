module.exports = function(io,socket,socketMap){

  socket.on('joinRoom',function(body){
    // socket.join(body.room);
  });
  socket.on('leaveRoom',function(body){
      // socket.leave(body.room);
  });

  socket.on('knockknock',function(body){
    //  socket.emit('knockknock',{/*knocknock questions*/});
  });
}
