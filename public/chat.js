let socket = io()
let username = $('#chat-messages').attr('name')

$('#chat-form').submit(() => {
  msg = $('#chat-input').val().trim()
  if (msg != '') socket.emit('message', username + ': ' + msg)
  $('#chat-input').val('')
  return false
})

socket.on('message', (msg) => {
  $('#chat-scroll').animate({
    scrollTop: $('#chat-messages').height()
  })
  $('#chat-messages').append($('<li class="chat-message">').text(msg))
})

socket.on('welcome', (data) => {
  msg = 'Welcome, ' + data.username + '!'
  if (data.userCount > 2) {
    msg += ' There are ' + (data.userCount - 1) + ' other people in this room.'
  } else if (data.userCount == 2) {
    msg += ' There is ' + (data.userCount - 1) + ' other person in this room.'
  } else {
    msg += ' You are the only person in this room.'
  }
  $('#chat-messages').append($('<li class="chat-message">').text(msg))
})

socket.on('joined', (username) => {
  $('#chat-messages').append($('<li class="chat-message">').text(username + ' has joined.'))
})

socket.on('left', (username) => {
  $('#chat-messages').append($('<li class="chat-message">').text(username + ' has left.'))
})