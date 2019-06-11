const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/photoslibrary.readonly']
}));

router.get('/redirect', passport.authenticate('google'), (req,res) => {
  res.redirect('/profile');
});

module.exports = router;
