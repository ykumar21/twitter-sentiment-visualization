const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/photoslibrary.readonly']
}));

router.get('/redirect', (req,res) => {
  res.send('Successfully logged in using google!');
});

module.exports = router;
