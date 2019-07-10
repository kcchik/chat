const Message = require('./models/message')
const User = require('./models/user')

const updateUsers = (io) => {
  const { ...sockets } = io.sockets.sockets
  const uids = Object.keys(sockets).map(key => sockets[key].uid).filter(uid => uid !== undefined)
  User.find({ _id: uids }, (e, users) => {
    activeUsers = users.map(user => ({
      username: user.username,
      uid: user._id,
    }))
    io.emit('loadUsers', {
      users: activeUsers,
    })
  })
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      updateUsers(io)
    })

    socket.on('addUser', (uid) => {
      // eslint-disable-next-line no-param-reassign
      socket.uid = uid
      Message.aggregate([{
        $lookup: {
          from: 'usermodels',
          localField: 'uid',
          foreignField: '_id',
          as: 'user',
        },
      }], (e, msgs) => {
        socket.emit('loadMessages', msgs.map(msg => ({
          username: msg.user[0].username_formatted,
          msg: msg.msg,
        })))
      })
      updateUsers(io)
    })

    socket.on('message', (data) => {
      User.find({ _id: data.uid }, (e, users) => {
        const clientData = {
          username: users[0].username_formatted,
          msg: data.msg,
        }
        socket.broadcast.emit('message', clientData)
        socket.emit('messageSelf', clientData)
        const msg = new Message(data)
        msg.save()
      })
    })
  })
}
