const mongoose = require('mongoose')

const MessageModelSchema = new mongoose.Schema({
  uid: mongoose.Schema.ObjectId,
  time: Date,
  msg: String,
})

module.exports = mongoose.model('MessageModel', MessageModelSchema)
