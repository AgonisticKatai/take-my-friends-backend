const User = require('../../../models/User.js')

function sendMessage (req, res) {
  const { _id } = req.user
  const { id } = req.params
  const { message } = req.body
  console.log(req.body)
  User.findByIdAndUpdate(id, {
    $push: { 'conversations': { 'messages': { author: _id, body: message } } }
  }, { 'new': true })
  .then(user => { res.status(200).json({ user, msg: 'message added properly...' }) })
  .catch(error => { res.status(500).json({ error, msg: 'problems sending message...' }) })
}

function saveMessage (req, res) {
  const { _id } = req.user
  const { id } = req.params
  const { message } = req.body
  console.log(req.body)
  User.findByIdAndUpdate(_id, {
    $push: { 'outbox': { 'messages': { adresseer: id, body: message } } }
  }, { 'new': true })
  .then(user => { res.status(200).json({ user, msg: 'message added properly...' }) })
  .catch(error => { res.status(500).json({ error, msg: 'problems sending message...' }) })
}

module.exports = saveMessage
