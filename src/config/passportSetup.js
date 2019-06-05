const passport = require('passport');
const GoogleOAuthStrategy = require('passport-google-oauth20');
const User = require('./user_model');

passport.use(
  new GoogleOAuthStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/auth/redirect'
  }, (accessToken, refreshToken, profile, done) => {

    // This callback function is fired when the
    // passport.authenticate function is called
    // again in the callback route (/auth/redirect).

    const googleId = profile.id;

    User.findOne({id: googleId}).then((currUser) => {
      if (currUser) {
        console.log('user exists');
        done(null, currUser);
      } else {
        const user = new User({
          username: profile.displayName,
          googleId: profile.id
        });

        user.save().then((newUser) => {
          console.log('new user saved!');
          done(null, newUser);
        });
      }
    });

  })
);

// serializeUser sets the id as cookie in the user's browser which
// can be retrieved later using deserializeUser function later.
//
// In other words: serializeUser decides what is stored in cookie
// and deserializeUser loads user data based on cookie content
//
// More info at:
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
