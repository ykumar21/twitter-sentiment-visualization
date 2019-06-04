const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/photoslibrary.readonly']
}));

module.exports = router;
