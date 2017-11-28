const User = require('../../../models/User.js')

function captureInboxParams (req, res, next) {
  const { _id } = req.user
  const { id } = req.params
  req.data = { _id, id }
  next()
}

async function removeInboxMessageById (req, res, next) {
  const { _id, id } = req.data
  try {
    await User.findByIdAndUpdate(_id, {
      '$pull': {inbox: { '_id': id }}
    })
    next()
  } catch (error) {
    const msg = 'problems in removeInboxMessageById...'
    res.status(500).json({ error, msg })
  }
}

function removeInboxMessageResultOk (req, res) {
  res.status(200).json({ msg: 'message removed properly...' })
}

module.exports = { captureInboxParams, removeInboxMessageById, removeInboxMessageResultOk }
