let socket = io()
let username

let focus;

$(window).focus(() => {
  document.title = `Chat`
})

$('#login-form').submit(() => {
  username = $('#login-username').val().trim()
  if (username != '') socket.emit('add', username)
  $('#login-usernmae').val('')
  $('#login').hide()
  $('#chat').show()
  $('#chat-input').focus()
  return false
})

$('#chat-form').submit(() => {
  msg = $('#chat-input').val().trim()
  if (msg != '') socket.emit('message', {
    username: username,
    msg: msg,
  })
  $('#chat-input').val('')
  return false
})

socket.on('message', (data) => {
  $('#chat-messages').append($('<li class="chat-message">').text(`${data.username}: ${data.msg}`))
  $('#chat-scroll').queue('fx', [])
  $('#chat-scroll').animate({
    scrollTop: $('#chat-messages').height()
  })
  document.title = `${data.username} says...`
})

socket.on('message self', (data) => {
  $('#chat-messages').append($('<li class="chat-message">').text(`${data.username}: ${data.msg}`))
  $('#chat-scroll').queue('fx', [])
  $('#chat-scroll').animate({
    scrollTop: $('#chat-messages').height()
  })
})

socket.on('welcome', (data) => {
  msg = `Welcome, ${data.username}!`
  if (data.userCount > 2) {
    msg += ` There are ${data.userCount - 1} other people in this room.`
  } else if (data.userCount == 2) {
    msg += ` There is ${data.userCount - 1} other person in this room.`
  } else {
    msg += ` You are the only person in this room.`
  }
  $('#chat-messages').append($('<li class="chat-message">').text(msg))
})

socket.on('joined', (username) => {
  $('#chat-messages').append($('<li class="chat-message">').text(`${username} has joined.`))
})

socket.on('left', (username) => {
  $('#chat-messages').append($('<li class="chat-message">').text(`${username} has left.`))
})