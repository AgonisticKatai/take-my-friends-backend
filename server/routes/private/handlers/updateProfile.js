const User = require('../../../models/User.js')

function updateProfile (req, res) {
  const { _id: id } = req.user
  const { name, lastname, email, profileImg, occupation } = req.body
  User.findByIdAndUpdate(id, {
    $set: {
      name: name || undefined,
      lastname: lastname || undefined,
      email: email || undefined,
      profileImg: profileImg || undefined,
      occupation: occupation || undefined
    }},
    { new: true }
  )
  .then(user => { res.status(200).json({ user, msg: 'user updated properly...' }) })
  .catch(error => { res.status(500).json({ error, msg: 'problems updating user...' }) })
}

module.exports = updateProfile
