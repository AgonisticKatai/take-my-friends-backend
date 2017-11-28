const { getPopulateSuggestions } = require('../services/UserService.js')

const getfilteredUserSuggestions = async (req, res) => {
  const {_id: id} = req.user
  const suggestedFriends = await getPopulateSuggestions(id)
  res.json(suggestedFriends)
}

module.exports = getfilteredUserSuggestions
