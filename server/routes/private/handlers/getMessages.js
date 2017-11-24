const User = require('../../../models/User.js')

function getMessages (req, res) {
  const { _id: id } = req.user
  User.findById(id, 'conversations', (err, messages) => {
    if (err) res.status(500).json({ err, msg: 'error finding conversations...' })
    User.populate(messages, {path: 'conversations.messages.author'}, (err, message) => {
      if (err) res.status(500).json({ err, msg: 'error populating messages...' })
      res.status(200).json(message)
    })
  })
}

module.exports = getMessages
