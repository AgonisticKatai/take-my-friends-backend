const User = require('../../../models/User.js')

function getFriends (req, res) {
  const { _id: id } = req.user
  User.findById(id, 'friends', (err, friends) => {
    if (err) res.status(500)
    User.populate(friends, {path: 'friends'}, (err, friend) => {
      if (err) res.status(500).json({ err, msg: 'error sending friends...' })
      res.status(200).json(friend)
    })
  })
}

module.exports = getFriends
