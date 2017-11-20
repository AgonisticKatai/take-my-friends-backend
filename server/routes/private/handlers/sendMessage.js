const User = require('../../../models/User.js')

function sendMessage (req, res) {
  const { _id: id } = req.user
  const { _id } = req.params
  const { message } = req.body
  
  User.findByIdAndUpdate(id, {
    $push: { "messages": { "message": { author: _id, body: message } } }
  }, { 'new': true })
  .then( user => { res.json({ user, msg: 'message added properly!'}) })
  .catch( error => { res.status(500).json({ error, msg: 'problems sending message' }) })
}

module.exports = sendMessage