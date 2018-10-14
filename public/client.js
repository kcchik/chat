let socket = io();
let username;

$('#login-form').submit(function() {
  username = $('#username').val().trim();
  if (username != '') socket.emit('add', username);
  $('#username').val('');
  return false;
});

$('#chat-form').submit(function() {
  msg = $('#m').val().trim();
  if (msg != '') socket.emit('message', username + ': ' + msg);
  $('#m').val('');
  return false;
});

socket.on('message', function(msg) {
  $('#scrollable').animate({
    scrollTop: $('#messages').height()
  });
  $('#messages').append($('<li class="message">').text(msg));
});

socket.on('joined', function(username) {
  $('#messages').append($('<li class="message">').text(username + ' has joined.'));
});

socket.on('left', function(username) {
  $('#messages').append($('<li class="message">').text(username + ' has left.'));
});