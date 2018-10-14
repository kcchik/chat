let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  id = "xX_hot_girl_69_Xx";
  socket.on('disconnect', function() {

  });
  socket.on('chat message', function(content) {
    msg = id + ': ' + content
    if (content != '') io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){

});
