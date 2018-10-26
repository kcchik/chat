let express = require('express')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', 'public/views')
app.set('view engine', 'pug')

MongoClient.connect('mongodb://kcchik:kcchikchat123@ds143163.mlab.com:43163/kcchikchat', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log(error)
  }
  let db = client.db('kcchikchat')

  require('./config/routes')(app, db)
  require('./controllers/server')(io)

  http.listen(process.env.PORT || 5000)
  console.log("Listening on port " + (process.env.PORT || 3000))
})