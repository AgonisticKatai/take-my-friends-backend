const User = require('../../../models/User.js')

function getUsers (req, res) {
  User.find((err, user) => {
    res.json(user)
  })
}

module.exports = getUsers