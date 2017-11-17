const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const facebookStrategy = new FacebookStrategy({
    clientID: process.env.facebookClientID,
    clientSecret: process.env.facebookClientSecret,
    callbackURL: "http://localhost:3005/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'provider', 'photos']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    })
  }
)

module.exports = facebookStrategy