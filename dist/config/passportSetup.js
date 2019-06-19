'use strict';

var passport = require('passport');
var GoogleOAuthStrategy = require('passport-google-oauth20');
var User = require('./user_model');

passport.use(new GoogleOAuthStrategy({
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  callbackURL: '/auth/redirect'
}, function (accessToken, refreshToken, profile, done) {

  // This callback function is fired when the
  // passport.authenticate function is called
  // again in the callback route (/auth/redirect).

  var googleId = profile.id;

  User.findOne({ googleId: googleId }, function (err, currUser) {
    if (err) {
      throw err;
    } else {
      if (currUser) {
        console.log('user already exists');
        done(null, currUser);
      } else {
        var user = new User({
          username: profile.displayName,
          googleId: profile.id
        });

        user.save().then(function (newUser) {
          console.log('new user saved');
          done(null, newUser);
        });
      }
    }
  });
}));

// serializeUser sets the id as cookie in the user's browser which
// can be retrieved later using deserializeUser function later.
//
// In other words: serializeUser decides what is stored in cookie
// and deserializeUser loads user data based on cookie content
//
// More info at:
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    done(null, user);
  });
});
//# sourceMappingURL=passportSetup.js.map