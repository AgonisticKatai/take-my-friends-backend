const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  provider: String,
  provider_id: {type: String, unique: true},
  photo: String,
  createdAt: {type: Date, default: Date.now}
})

const User = mongoose.model('User', UserSchema)