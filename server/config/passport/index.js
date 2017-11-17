const passport = require('passport')

const User = require('./../../models/User')

const jwtStrategy = require('./strategies/jwt')
const googleStrategy = require('./strategies/google-strategy')
const facebookStrategy = require('./strategies/facebook-strategy')

passport.use( User.createStrategy() )
passport.use( jwtStrategy )
passport.use( googleStrategy )
passport.use( facebookStrategy )

module.exports = passport