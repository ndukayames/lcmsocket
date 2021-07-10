let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(server, {
  origins: ["*"],
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
})
 
io.on('connection', (socket) => {
  console.log('connection made')
  socket.on('test_connection', () => {
    console.log('test_connection')
    io.emit('test_result', { event: 'connected'});   
  });
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});