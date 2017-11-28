const _ = require('lodash')
const User = require('../../../models/User.js')

async function getPopulateSuggestions (id) {
  const suggestions = await getFriendsOfFriendsNoRepeat(id)
  const suggestionsPopulated = suggestions.map(user => {
    return getUserById(user)
  })
  let SuggestionsPopulated = await Promise.all(suggestionsPopulated)
  return SuggestionsPopulated
}

async function getUserById (id) {
  const user = await User.findById(id)
  return user
}

async function getFriendsById (id) {
  const { friends } = await User.findById(id)
  return friends
}

async function getFriendsOfUserFriends (id) {
  const friends = await getFriendsById(id)
  const FriendsOfFriends = friends.map(friend => {
    return getFriendsById(friend)
  })
  let friendsOfFriends = await Promise.all(FriendsOfFriends)
  return friendsOfFriends
}

async function getFriendsOfFriendsToArray (id) {
  const friendsOfFriendsFlat = await getFriendsOfUserFriends(id)
  return _.flattenDeep(friendsOfFriendsFlat)
}

async function getFriendsOfFriendsWithoutUser (id) {
  const friendsOfFriendsWithoutUser = await getFriendsOfFriendsToArray(id)
  return _.pullAllWith(friendsOfFriendsWithoutUser, [id], _.isEqual)
}

async function getFriendsOfFriendsToString (id) {
  let friendsOfFriendsNoRepeat = await getFriendsOfFriendsWithoutUser(id)
  return friendsOfFriendsNoRepeat.map(id => id.toString())
}

async function getFriendsOfFriendsNoRepeat (id) {
  const friendsOfFriendsNoRepeat = await getFriendsOfFriendsToString(id)
  return _.uniq(friendsOfFriendsNoRepeat)
}

module.exports = { getPopulateSuggestions, getUserById, getFriendsById, getFriendsOfUserFriends, getFriendsOfFriendsToArray, getFriendsOfFriendsWithoutUser, getFriendsOfFriendsToString, getFriendsOfFriendsNoRepeat }
