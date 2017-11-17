const User = require('../../../models/User')

function registerUser (req, res) {
  const username =  req.body.email
  const password = req.body.password
  const account = new User({ username })

  User.register(account, password, (err, user) => {
    if (err) {
      return res.status(500).json({success: false, msg: 'Username already exists.'})
    }
    res.status(200).json(User)
  })
}

module.exports = registerUser
