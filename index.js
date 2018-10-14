let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    socket.broadcast.emit('left', username);
  });
  socket.on('add', function(username) {
    socket.username = username;
    socket.broadcast.emit('joined', username);
  });
  socket.on('message', function(msg) {
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 3000, function() {
  console.log("Starting server...")
});