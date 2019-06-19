'use strict';

var router = require('express').Router();
var passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/photoslibrary.readonly']
}));

router.get('/redirect', passport.authenticate('google'), function (req, res) {
  res.redirect('/');
});

module.exports = router;
//# sourceMappingURL=auth-routes.js.map