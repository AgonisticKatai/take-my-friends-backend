const User = require('../../../models/User.js')

function removeMessageById (req, res) {
  const { _id } = req.user
  const { id } = req.params
  User.findByIdAndUpdate(_id,
    {
      '$pull': {conversations: {'_id': id}}
    }, (err, message) => {
      if (err) res.status(500).json({ err, msg: 'error deleting message...' })
      res.status(200).json(message)
    }
  )
}

module.exports = removeMessageById
