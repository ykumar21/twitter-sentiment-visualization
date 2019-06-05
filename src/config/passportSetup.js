const passport = require('passport');
const GoogleOAuthStrategy = require('passport-google-oauth20');
const User = require('./user_model');

passport.use(
  new GoogleOAuthStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/auth/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    const user = new User({
      username: profile.displayName,
      googleId: profile.id
    });

    user.save().then(() => {
      console.log('new user saved!');
    });
  })
);
