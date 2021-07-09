let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
io.on('connection',(socket) => {
  socket.emit('connection_status', 'socket is working')
   console.log("user connected")
})
var port = process.env.PORT || 3001;
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});

//  setInterval(() => {
//   socket.broadcast.emit('check-something',{message:'something is here'})
// }, 100);
