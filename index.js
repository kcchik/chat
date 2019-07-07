require('dotenv').config()

const path = require('path')

const express = require('express')

const app = express()

const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use('/scripts', express.static(path.join(__dirname, '/node_modules')))
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
}))

require('mongoose').connect(process.env.DATABASE_URL, { useNewUrlParser: true })

global.activeUsers = []

const http = require('http').Server(app)

const io = require('socket.io')(http)

require('./socket')(io)

require('./routes')(app)

http.listen(process.env.PORT)
