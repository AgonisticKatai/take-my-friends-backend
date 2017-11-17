const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const googleStrategy = new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL:'/auth/google/redirect'
  }, ((accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
      return cb(err, user)})}))

module.exports = googleStrategy
