const express = require('express')
const router = express.Router()

const data = require('../../../data.json')

router.get('/home', (req, res) => {
  res.json(data)
})

module.exports = router