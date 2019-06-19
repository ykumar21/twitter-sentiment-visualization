'use strict';

var FetchTweets = require('./utils/fetchTweets');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get('/', function (req, res) {
    if ('user' in req) {
      res.render('reg-index', {
        username: req.user.username
      });;
    } else {
      res.render('index');
    }
  });

  app.get('/map', function (req, res) {
    res.render('dash.ejs');
  });

  app.post('/map', urlencodedParser, function (req, res) {
    if ('body' in req) {
      FetchTweets(app, {
        query: req.body.q,
        count: 1000
      });

      res.send('success');
    } else {
      res.status(404).send('Empty Request...');
    }
  });
};
//# sourceMappingURL=routes.js.map