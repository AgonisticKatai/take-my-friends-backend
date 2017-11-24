const User = require('../../../models/User.js')

function getFriendsJobs (req, res) {
  const { _id: id } = req.user
  User.findById(id, 'friends', (err, friends) => {
    if (err) res.status(500).json({ err, msg: 'error finding friends jobs...' })
    User.populate(friends, {path: 'friends'}, (err, user) => {
      if (err) res.status(500).json({ err, msg: 'error populating friends...' })
      const jobs = user.friends.reduce((acc, item) => {
        if (!acc.includes(item.occupation)) {
          acc.push(item.occupation)
        }
        return acc
      }, [])
      res.status(200).json(jobs)
    })
  })
}

module.exports = getFriendsJobs
