const _ = require('lodash')
const User = require('../../../models/User.js')

const getSuggestions = async (id) => {
  const suggestions = await getFriendsOfUserFriends(id)
  const suggestionsPopulated = suggestions.map(user => {
    return getSuggestionsPopulated(user)
  })
  let SuggestionsPopulated = await Promise.all(suggestionsPopulated)
  return SuggestionsPopulated
}

const getSuggestionsPopulated = async (id) => {
  const user = await User.findById(id)
  return user
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
  let friendsOfFriendsNoRepeat = _.uniq(friendsOfFriendsWithoutUser)

  // let friendsOfFriendsNoRepeat = friendsOfFriendsWithoutUser.reduce((acc, user) => {
  //   if (!acc.includes(user)) { acc.push(user) }
  //   return acc
  // }, [])

  console.log(friendsOfFriendsNoRepeat)

  // debugger
  return friendsOfFriendsNoRepeat
}

module.exports = { getSuggestions, getSuggestionsPopulated, getUserFriends, getFriendsOfUserFriends }
