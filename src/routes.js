const FetchTweets = require('./utils/fetchTweets');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/profile', function(req, res) {
    if ('user' in req) {
      res.render('dash.ejs');
      FetchTweets({
        query: '#AUSvsWI',
        count: 1000
      });
    } else {
      res.status(401).send('Unauthorized!');
    }
  });
};
