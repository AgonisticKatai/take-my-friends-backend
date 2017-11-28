const { getSuggestions } = require('../services/UserService.js')

const getfilteredUserSuggestions = async (req, res) => {
  const {_id: id} = req.user
  const suggestedFriends = await getSuggestions(id)
  res.json(suggestedFriends)
}

module.exports = getfilteredUserSuggestions
