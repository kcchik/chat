let socket = io()
let username

$('#login-form').submit(() => {
  username = $('#login-username').val().trim()
  if (username) {
    socket.emit('add', username)
  }
})