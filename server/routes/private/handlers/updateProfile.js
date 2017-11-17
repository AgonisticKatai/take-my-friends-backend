const User = require('../../../models/User.js')

function updateProfile (req, res) {
  const { _id: id } = req.user
  const {name, lastname, email, profile_img, occupation} = req.body
  
  User.findByIdAndUpdate( id,  {
    $set: {
      name: name || undefined, 
      lastname: lastname || undefined,
      email: email || undefined,
      profile_img: profile_img || undefined,
      occupation: occupation || undefined
    }},
    { new: true }
  )
  .then( user => { res.json({ user, msg: 'user updated properly!'}) })
  .catch( error => { res.status(500).json({ error, msg: 'problems updating user'}) })
}

module.exports = updateProfile