import Sentiment from 'sentiment';
import * as cities from '../public/data/cities'

const sentiment = new Sentiment();

module.exports = function(app, tweets) {
  const io = app.get('socket.io');
  function checkExist(location, array) {
    let found = 0;
    for (let i = 0; i < array.length; i++) {
      if (location == array[i].location) {
        found++;
      }
    }

    if (found) {
      return true;
    } else {
      return false;
    }
  }

  function calculateScores(tweets) {
    return new Promise(function(resolve, reject) {
      try {
        let scores = [];
        for (let i = 0; i < tweets.length; i++) {
          if (checkExist(tweets[i].location, scores)) {
            let index = 0;
            for (let j = 0; j < scores.length; j++) {
              if (scores[j].location == tweets[i].location) {
                index = j;
              }
            }
            scores[index].score += sentiment.analyze(scores[index].text).score;
          } else {
            scores.push({
              location: tweets[i].location,
              score: sentiment.analyze(tweets[i].text).score
            });
          }
        }

        for (let i = 0; i < scores.length; i++) {
          let location = scores[i].location;
          console.log(i);
          if (location.indexOf(',')) {
            scores[i].location = (location.slice(location.indexOf(',') + 1, location.length)).trim();
          }
        }

        resolve(scores);

      } catch (err) {
        reject(err);
      }
    });
  }

  calculateScores(tweets)
    .then((data) => {
      io.emit('final', data);
    })
    .catch((error) => {
      console.error(error);
    })
};
