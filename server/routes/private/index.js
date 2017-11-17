const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')
const getUsers = require('./handlers/getUsers')
const getUser = require('./handlers/getUser')
const getUserById = require('./handlers/getUserById.js')
const updateProfile = require('./handlers/updateProfile')
const addFriend = require('./handlers/addFriend')
const getFriends = require('./handlers/getFriends.js')

router.use( passport.authenticate('jwt', { session: false } ) )
router.get('/users', getUsers)
router.get('/user', getUser)
router.get('/user/:id', getUserById)
router.put('/user/:_id', addFriend)
router.put('/account', updateProfile)
router.get('/friends', getFriends)

module.exports = router