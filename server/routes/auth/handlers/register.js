const User = require('../../../models/User')
const { registerEmail } = require('../../private/handlers/sendEmail.js')

function registerUser (req, res) {
  const username = req.body.email
  const password = req.body.password
  const account = new User({ username })

  User.register(account, password, (err, user) => {
    if (err) {
      return res.status(500).json({err})
    }
    res.status(200).json(User)
  })
  registerEmail(username)
}

module.exports = registerUser
