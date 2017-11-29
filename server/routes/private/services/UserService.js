const _ = require('lodash')
const User = require('../../../models/User.js')

async function getPopulateSuggestions (id) {
  const suggestions = await getSuggestionsCompareUserFriends(id)
  console.log('suggestions', suggestions)
  const SuggestionsPopulated = suggestions.map(user => {
    return getUserById(user)
  })
  let suggestionsPopulated = await Promise.all(SuggestionsPopulated)
  return suggestionsPopulated
}

async function getUserById (id) {
  const user = await User.findById(id)
  console.log('getUserById....', user)
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

async function getSuggestionsCompareUserFriends (id) {
  let friendsOfFriends = await getFriendsOfFriendsNoRepeat(id)
  let userFriends = await getFriendsById(id)
  // let friendsOfFriendsFlat = _.flattenDeep(friendsOfFriends)
  // friendsOfFriendsFlat = friendsOfFriendsFlat.map(friend => friend.toString())
  // let userFriendsFlat = _.flattenDeep(userFriends)
  // userFriendsFlat = userFriendsFlat.map(friend => friend.toString())
  const suggestionsCompareUserFriends = friendsOfFriends.filter(userFriend => {
    if (!userFriends.includes(userFriend)) { return userFriend }
  })
  return suggestionsCompareUserFriends
}

module.exports = { getPopulateSuggestions, getUserById, getFriendsById, getFriendsOfUserFriends, getFriendsOfFriendsToArray, getFriendsOfFriendsWithoutUser, getFriendsOfFriendsToString, getFriendsOfFriendsNoRepeat, getSuggestionsCompareUserFriends }
