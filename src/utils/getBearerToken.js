const request = require('request');

module.exports = function getBearerToken(credentials, callback) {
  return new Promise(function(resolve, reject) {
    // Encode a string as per RFC 1738
    function encodeStr(str) {
      return encodeURIComponent(str)
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
    }

    try {
      const consumerKey = encodeStr(credentials.consumerKey);
      const consumerSecret = encodeStr(credentials.consumerSecret);

      const rawKey = consumerKey + ':' + consumerSecret;

      // Convert raw key to base64
      const key = Buffer.from(rawKey).toString('base64');

      // Send POST request to twitter API for
      // bearer token for App-only Authentication
      request.post({
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
          'Authorization': 'Basic ' + key,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'grant_type=client_credentials',
        json: true
      }, function(err, res, body) {
        if (!body) {
          reject('Not valid reply from Twitter upon obtaining bearer token');
        } else {
          resolve(res);
        }
      });

    } catch (err) {
      console.log(err);
    };
  });
};
