import request from 'request';
import getBearerToken from './getBearerToken';
import getScore from './getScore';


module.exports = function FetchTweets(options) {
  const credentials = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET

  };
  let reqOpts = new Object; // Holds options for GET request for tweet search

  getBearerToken(credentials)
  .then((response) => {
    const bearerToken = response.body.access_token;

    // Create oauth option for GET request
    reqOpts.oauth = credentials;

    // Create headers for GET request
    let headers = {
      'Authorization': 'Bearer ' + bearerToken,
      'Content-type': 'application/json'
    };
    reqOpts.headers = headers;

    request.get({
      url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23StanleyCup&count=100&tweet_mode=extended',
      headers: reqOpts.headers
    }, function (err, res, body) {
      if (err) {
        throw err;
      } else {
        let tweetData = JSON.parse(body);
        let tweets = tweetData.statuses;
        let data = [];

        for (let i = 0; i < tweets.length; i++) {
          if (tweets[i].user.location) {
            data.push({
              text: tweets[i].full_text,
              location: tweets[i].user.location
            });
          }
        }

        getScore(data);
      }

    });
  })
  .catch((err) => {
    console.error(err);
  });
};