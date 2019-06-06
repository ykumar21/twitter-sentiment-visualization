const Twit = require('Twit');

module.exports = function FetchTweets(options) {
  const twit = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
  });

  twit.get('search/tweets', {
    q: options.query,
    count: 100
  }, function(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      const tweetData = [];
      let nullCounter = 0;

      console.log(data.statuses.length);

      for (let i = 0; i < data.statuses.length; i++) {
        const location = data.statuses[i].user.location;
        const tweetText = data.statuses[i].text;

        if (location) {
          tweetData.push({
            text: tweetText,
            location: location
          });
        } else {
          nullCounter++;
        }
      }

    }
  });
};
