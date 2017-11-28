const User = require('../../../models/User.js')

function getInboxMessages (req, res) {
  const { _id: id } = req.user
  User.findById(id, 'inbox', (err, messages) => {
    if (err) res.status(500).json({ err, msg: 'error finding inbox messages...' })
    User.populate(messages, { path: 'inbox.messages.author' }, (err, message) => {
      if (err) res.status(500).json({ err, msg: 'error populating messages...' })
      res.status(200).json(message)
    })
  })
}

module.exports = getInboxMessages
