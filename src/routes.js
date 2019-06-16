const FetchTweets = require('./utils/fetchTweets');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/map', function(req, res) {
    res.render('dash.ejs');
  });

  app.post('/map', urlencodedParser, function(req, res) {
      FetchTweets(app, {
        query: req.body.q,
        count: 1000
      });

      res.send('success');
  });
};
