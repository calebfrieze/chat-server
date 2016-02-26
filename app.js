'use strict'

var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.Server(app),
    io = require('socket.io')(server)

app.set('port', 3000)
app.use(express.static('public'))
server.listen(app.get('port'), () => {
  console.log('Chat Server listening on port ' + app.get('port'))
})

io.on('connection', (socket) => {
  console.log("User connected");
  socket.on('chat', (data, cb) => {
    socket.emit('chat', data)
    socket.broadcast.emit('chat', data)
    cb(null);
  })
  socket.on('disconnect', (socket) => {
    console.log("User disconnected");
  })
})

