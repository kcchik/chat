var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  id = "xX_hot_girl_69_Xx";
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(content) {
    msg = id + ': ' + content
    if (content != '') io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});