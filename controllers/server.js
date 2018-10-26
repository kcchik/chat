module.exports = (io) => {

  let userCount = 0

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      if (socket.username) {
        userCount--
        socket.broadcast.emit('left', socket.username)
      }
    })
    socket.on('add', (username) => {
      socket.username = username
      userCount++
      socket.broadcast.emit('joined', username)
      socket.emit('welcome', {
        username: username,
        userCount: userCount,
      })
    })
    socket.on('message', (msg) => {
      io.emit('message', msg)
    })
  })
}