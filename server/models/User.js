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
  friends: [{type: ObjectId, ref: 'User'}],
  messages: [{
    messageId: {type: ObjectId, ref: 'User'}, 
    message: [{
      body: String,
      author: {type: ObjectId, ref: 'User'},
      cerateAt: {type: Date, default: Date.now}       
    }]
  }]
}, { collection })

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
