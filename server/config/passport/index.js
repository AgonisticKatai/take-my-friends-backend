const passport = require('passport')

const User = require('./../../models/User')

const jwtStrategy = require('./strategies/jwt')
const googleStrategy = require('./strategies/google-strategy')
const facebookStrategy = require('./strategies/facebook-strategy')
const linkedInStrategy = require('./strategies/linkedin-strategy.js')

passport.use(User.createStrategy())
passport.use(jwtStrategy)
passport.use(googleStrategy)
passport.use(facebookStrategy)
passport.use(linkedInStrategy)

module.exports = passport
