const _ = require('lodash')
const User = require('../../../models/User.js')

const getfilteredSuggestions = async (req, res) => {
  const { _id: id } = req.user

  const getSuggestions = async (id) => {
    const suggestions = await getFriendsOfUserFriends(id)
    res.json(suggestions)
  }

  const getUserFriends = async (id) => {
    const { friends } = await User.findById(id)
    return friends
  }

  const getFriendsOfUserFriends = async (id) => {
    const friends = await getUserFriends(id)
    const FriendsOfFriends = friends.map(friend => {
      return getUserFriends(friend)
    })
    let friendsOfFriends = await Promise.all(FriendsOfFriends)
    let friendsOfFriendsFlat = _.flattenDeep(friendsOfFriends)
    let friendsOfFriendsWithoutUser = _.pullAllWith(friendsOfFriendsFlat, [id], _.isEqual)
    console.log(id)
    console.log(friendsOfFriendsWithoutUser)

    return friendsOfFriendsWithoutUser
  }
  await getSuggestions(id)
}

module.exports = getfilteredSuggestions
