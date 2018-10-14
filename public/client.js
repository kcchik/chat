$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#scrollable').animate({ scrollTop: $('#messages').height() });
    $('#messages').append($('<li class="message">').text(msg));
  });
});