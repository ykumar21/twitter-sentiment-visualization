const request = require('request');
const getBearerToken = require('./getBearerToken.js');

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
      'Authorization': 'Bearer ' + bearerToken
    };
    reqOpts.headers = headers;

    console.log(bearerToken);
    console.log(reqOpts);
  })
  .catch((err) => {
    console.error(err);
  });
};
