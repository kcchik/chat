const mongoose = require('mongoose')

const UserModelSchema = new mongoose.Schema({
  username_formatted: String,
  username: String,
  email: String,
})

module.exports = mongoose.model('UserModel', UserModelSchema)
