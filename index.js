let express = require('express')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

let userCount = 0

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    if (userCount != 0) {
      userCount--
    }
    socket.broadcast.emit('left', socket.username)
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

http.listen(process.env.PORT || 3000, () => {
  console.log("Starting server on server " + (process.env.PORT || 3000))
})