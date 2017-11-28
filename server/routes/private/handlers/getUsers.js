const User = require('../../../models/User.js')

function getUsers (req, res) {
  const { _id: id } = req.user
  User.find((err, user) => {
    if (err) res.status(500).json({ err, msg: 'error finding users...' })
    const suggestions = user.reduce((acc, userData) => {
      if (userData._id !== id) {
        acc.push(userData)
      }
      return acc
    }, [])
    res.status(200).json(suggestions)
  })
}

module.exports = getUsers
