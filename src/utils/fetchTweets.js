const request = require('request');
const getBearerToken = require('./getBearerToken.js');

module.exports = function FetchTweets(options) {
  const credentials = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  };

  getBearerToken(credentials)
  .then((response) => {
    const accessToken = response.body.access_token;
  })
  .catch((err) => {
    console.error(err);
  });
};
