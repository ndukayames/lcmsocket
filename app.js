let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
 
io.on('connection', (socket) => {
 console.log('connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  });
 socket.on('test_connection', function() {
   console.log('test received')
   io.emit('test_result', {result: 'test successful'})
 })  
});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});