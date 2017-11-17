const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const collection = 'users'

const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  lastname: String,
  email: String,
  profile_img: String,
  occupation: String,
  friends: [{type: ObjectId, ref: 'User'}]
}, { collection })

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
