const User = require('../../../models/User.js')

function getUserById (req, res) {
  const { id } = req.params
  User.findById(id, (err, user) => {
    if (err) res.status(500).json({ err, msg: 'error finding user...' })
    res.status(200).json(user)
  })
}

module.exports = getUserById
