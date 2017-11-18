const User = require('../../../models/User.js')

function getFriendsByJob (req, res) {
  const {_id: id} = req.user
  const {job} = req.params
  User.find({occupation: job}, (err, user) => {
  res.json(user)
})
  // User.findById(id, "friends", (err, friends) => {
  //   User.populate(friends, {path: "friends"}, (err, friend) => {
  //     res.json(friend)     
  //   })
  // })
}

module.exports = getFriendsByJob