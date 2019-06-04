const passport = require('passport');
const GoogleOAuthStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleOAuthStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/auth/redirect'
  }, () => {
    //callback
  })
);
