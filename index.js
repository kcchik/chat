let express = require('express')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)

app.use(express.static('public'))

app.set('views', 'public/views')
app.set('view engine', 'pug')

require('./config/routes')(app)
require('./controllers/server')(io)

http.listen(process.env.PORT || 3000)
console.log("Listening on port " + (process.env.PORT || 3000))