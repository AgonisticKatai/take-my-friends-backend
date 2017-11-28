const passport = require('passport')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

passport.use(new LinkedInStrategy({
  clientID: process.env.linkedinCliendID,
  clientSecret: process.env.linkedinClientSecret,
  callbackURL: 'http://127.0.0.1:3000/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_basicprofile']
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile)
  })
}))
