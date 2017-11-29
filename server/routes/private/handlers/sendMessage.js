const User = require('../../../models/User.js')
const { messageNotificationEmail } = require('../../private/handlers/sendEmail.js')

function captureParams (req, res, next) {
  const { _id } = req.user
  const { id } = req.params
  const { message, username, name, lastname } = req.body
  console.log(username, name, lastname)
  req.data = { _id, id, message, username, name, lastname }
  next()
}

async function sendMessage (req, res, next) {
  const { _id, id, message } = req.data
  try {
    await User.findByIdAndUpdate(id, {
      $push: { 'inbox': { 'messages': { author: _id, body: message } } }
    }, { 'new': true })
    next()
  } catch (error) {
    const msg = 'problems in sendMessage...'
    res.status(500).json({ error, msg })
  }
}

async function saveMessage (req, res, next) {
  const { _id, id, message } = req.data
  try {
    await User.findByIdAndUpdate(_id, {
      $push: { 'outbox': { 'messages': { adresseer: id, body: message } } }
    }, { 'new': true })
    next()
  } catch (error) {
    const msg = 'problems in saveMessage...'
    res.status(500).json({ error, msg })
  }
}

async function notificationEmail (req, res, next) {
  const { username, name, lastname } = req.data
  console.log(username, name, lastname)
  await messageNotificationEmail(username, name, lastname)
  next()
}

async function sendingMessagesResultOk (req, res) {
  res.status(200).json({ msg: 'message added properly...' })
}

module.exports = { captureParams, sendMessage, saveMessage, notificationEmail, sendingMessagesResultOk }
