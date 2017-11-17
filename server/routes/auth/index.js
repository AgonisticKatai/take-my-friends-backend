const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')

const register = require('./handlers/register')
const login = require('./handlers/login')

router.post('/register', register)
router.post('/login', passport.authenticate('local', { session: false }), login)

module.exports = router