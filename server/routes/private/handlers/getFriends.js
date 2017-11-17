const User = require('../../../models/User.js')

function getFriends (req, res) {
  const { _id: id } = req.user
  User.findById(id, "friends", (err, friends) => {
    User.populate(friends, {path: "friends"}, (err, friend) => {
      res.json(friend)
    })  
  })
}

module.exports = getFriends