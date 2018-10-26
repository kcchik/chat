module.exports = (io) => {

  let userCount = 0

  io.of('/chat').on('connection', (socket) => {
    socket.on('disconnect', () => {
      if (socket.username) {
        userCount--
        socket.broadcast.emit('left', socket.username)
      } else {
        socket.broadcast.emit('left', 'User')
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
      io.of('/chat').emit('message', msg)
    })
  })
}