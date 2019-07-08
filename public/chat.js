/* eslint-disable no-undef */
const socket = io()

$(window).focus(() => {
  document.title = 'chat'
})

socket.emit('addUser', uid)

$('.logout').click(() => {
  $.post('/logout', { username }, () => {
    window.location.replace('/')
  })
})

$('.chat form').submit((evt) => {
  evt.preventDefault()
  const msg = $('.chat form input').val().trim()
  if (msg !== '') {
    socket.emit('message', {
      time: new Date(),
      uid,
      msg,
    })
  }
  $('.chat form input').val('')
  return false
})

const appendMsg = (username, msg) => {
  const content = $('<li class="message">')
    .append($('<p class="message-username">').text(username))
    .append($('<p class="message-content">').text(msg))
  $('.messages').append(content)
}

const scroll = () => {
  $('.scroll').queue('fx', [])
  $('.scroll').animate({
    scrollTop: $('.messages').height(),
  })
}

socket.on('message', (data) => {
  appendMsg(data.username, data.msg)
  scroll()
  document.title = `new message from ${data.username}`
})

socket.on('messageSelf', (data) => {
  appendMsg(data.username, data.msg)
  scroll()
})

socket.on('loadMessages', (data) => {
  data.map(msg => appendMsg(msg.username, msg.msg))
  $('.scroll').scrollTop($('.messages').height())
})

socket.on('loadUsers', (data) => {
  $('.users').empty()
  data.users
    // .filter(user => user.uid !== uid)
    .map(user => $('.users').append($('<div class="user">').append($('<span>').text(user.username))))
})
