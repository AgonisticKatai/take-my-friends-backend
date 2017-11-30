const User = require('../../../models/User.js')

function getOutboxMessages (req, res) {
  const { _id: id } = req.user
  User.findById(id, 'outbox', (err, messages) => {
    if (err) res.status(500).json({ err, msg: 'error finding outbox messages...' })
    User.populate(messages, {path: 'outbox.messages.adresseer'}, (err, message) => {
      if (err) res.status(500).json({ err, msg: 'error populating outbox messages...' })
      res.status(200).json(message)
    })
  })
}

module.exports = getOutboxMessages
