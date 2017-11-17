const User = require('../../../models/User.js')

function getUser (req, res) {
  const user = req.user
  console.log(user)
  res.json(user)
}

module.exports = getUser