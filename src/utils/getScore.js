import Sentiment from 'sentiment';
import * as Locations from '../public/data/locations';

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

    for (let i = 0; i < scores.length; i++) {
      let location = scores[i].location.toUpperCase();

      // 1st level of extraction: USA States
      // if state code or state name exists in the
      // location text then replace the location by the state
      for (let j = 0; j < Locations.StateCodes.length; j++) {
        if (location.includes(Locations.StateCodes[j].toUpperCase()) || location.includes(Locations.States[j].toUpperCase())) {
          scores[i].location = Locations.States[j];
          scores[i].parsed = true;
          scores[i].local = true;
          scores[i].score = scores[i].score;
        }
      }

      // 2nd level of extraction: World
      // if country name exists in the location text
      // then replace the location by the country
      for (let k = 0; k < Locations.Countries.length; k++) {
        if (location.includes(Locations.Countries[k].toUpperCase())) {
          scores[i].location = Locations.Countries[k];
          scores[i].parsed = true;
          scores[i].local = false;
          scores[i].score = scores[i].score;
        }
      }
    }

    return scores;
  }
  console.log(calculateScores(tweets));
  return calculateScores(tweets);
};
