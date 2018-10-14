var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  id = "000" + Math.floor(Math.random() * 1000);
  id = id.substr(id.length - 4);
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(content) {
    msg = id + ': ' + content
    if (content != '') io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});