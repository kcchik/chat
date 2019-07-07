/* eslint-disable no-undef */
const socket = io()

$(window).focus(() => {
  document.title = 'Chat'
})

socket.emit('addUser', uid)

$('.logout').click(() => {
  $.post('/logout', { username }, () => {
    window.location.replace('/')
  })
})

$('.form').submit((evt) => {
  evt.preventDefault()
  const msg = $('.form input').val().trim()
  if (msg !== '') {
    socket.emit('message', {
      time: new Date(),
      uid,
      msg,
    })
  }
  $('.form input').val('')
  return false
})

const appendMsg = (username, msg) => {
  const content = $('<div class="message-container">')
    .append($('<p class="message-username">').text(username))
    .append($('<p class="message-content">').text(msg))
  $('.messages').append($('<li class="message">').append(content))
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
  document.title = `${data.username} says...`
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
  data.users.filter(user => user.uid !== uid).map(user => $('<div class="user">').append($('<span>').text(user.username)).appendTo('.users'))
})
