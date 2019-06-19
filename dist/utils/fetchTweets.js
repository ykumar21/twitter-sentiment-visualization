'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _getBearerToken = require('./getBearerToken');

var _getBearerToken2 = _interopRequireDefault(_getBearerToken);

var _getScore = require('./getScore');

var _getScore2 = _interopRequireDefault(_getScore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function FetchTweets(app, options) {
  var io = app.get('socket.io');
  var credentials = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET

  };
  var reqOpts = new Object(); // Holds options for GET request for tweet search

  (0, _getBearerToken2.default)(credentials).then(function (response) {
    var bearerToken = response.body.access_token;

    // Create oauth option for GET request
    reqOpts.oauth = credentials;

    // Create headers for GET request
    var headers = {
      'Authorization': 'Bearer ' + bearerToken,
      'Content-type': 'application/json'
    };
    reqOpts.headers = headers;

    _request2.default.get({
      url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + options.query + '&count=100&tweet_mode=extended',
      headers: reqOpts.headers
    }, function (err, res, body) {
      if (err) {
        throw err;
      } else {
        var tweetData = JSON.parse(body);
        var tweets = tweetData.statuses;
        var data = [];

        for (var i = 0; i < tweets.length; i++) {
          if (tweets[i].user.location) {
            data.push({
              text: tweets[i].full_text,
              location: tweets[i].user.location
            });
          }
        }

        // Generate scores for tweets
        io.emit('final', (0, _getScore2.default)(data));
      }
    });
  }).catch(function (err) {
    console.error(err);
  });
};
//# sourceMappingURL=fetchTweets.js.map