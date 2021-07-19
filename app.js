let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
 
io.on('connection', (socket) => {
 console.log('connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  });
  socket.on('create_my_class', (class_param) => {
    // activates when a new class has been created by the HOC
    // then emits a response with the class parameter
    // which is used by the app to check for the students to notify of the new class
    socket.broadcast.emit('check_new_class', class_param)
  })
 socket.on('test_connection', function() {
   // used to test the socket's connection
   console.log('test received')
   io.emit('test_result', {result: 'test successful'})
 })  
 socket.on('change_class_status', (classParam) => {
   // activates when the status of a class changes
   console.log(classParam)
  io.emit('class_status_changed', classParam)
 })
 socket.on('create_new_assignment', (assignmentParam) => {
  // activates when the lecturer creates a new assignment
  // a response is sent to the students who registered the courses
  socket.broadcast.emit('new_assignment_created', assignmentParam)
 })
 socket.on('edit_assignment', (assignmentParam) => {
  // activates when the lecturer creates a new assignment
  // a response is sent to the students who registered the courses
  socket.broadcast.emit('assignment_edited', assignmentParam)
 })
 socket.on('submit_student_score', (scoreParam) => {
   // activates when lecturer submits students score
   // a response is sent to the student who has been scored
   socket.broadcast.emit('new_assignment_score', scoreParam)
 })
 socket.on('student_submit_assignment', (course_id) => {
   //activates when a student uploads a document to submit their assignment
   socket.broadcast.emit('new_assignment_submission', course_id)
 })
});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});