import Sentiment from 'sentiment';
import * as cities from '../public/data/cities'

const sentiment = new Sentiment();

module.exports = function(tweets) {
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
  function extractLocations(array) {
    for (let i = 0; i < array.length; i++) {
      let location = array[i].location;

      if (array.indexOf(',') == -1) {

      }
    }
  }
  function calculateScores(tweets) {
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

    return extractLocations(scores);
  }

  console.log(calculateScores(tweets));
};
