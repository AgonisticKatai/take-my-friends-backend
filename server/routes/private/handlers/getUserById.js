const User = require('../../../models/User.js')

function getUserById (req, res) {
  const {id} = req.params
  User.findById(id, (err, user) => {
    res.json(user)
  })
}

module.exports = getUserById