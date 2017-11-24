const User = require('../../../models/User.js')

function getFriendsByJob (req, res) {
  const { _id: id } = req.user
  const { job } = req.params
  User.findById(id, 'friends', (err, friends) => {
    if (err) res.status(500).json({ err, msg: 'error finding friends...' })
    User.populate(friends, {path: 'friends'}, (err, user) => {
      if (err) res.status(500).json({ err, msg: 'error populating friends...' })
      const userCoincidence = user.friends.reduce((acc, item) => {
        if (item.occupation === job) {
          acc.push(item)
        }
        return acc
      }, [])
      res.status(200).json(userCoincidence)
    })
  })
}

module.exports = getFriendsByJob
