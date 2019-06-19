'use strict';

var _sentiment = require('sentiment');

var _sentiment2 = _interopRequireDefault(_sentiment);

var _locations = require('../public/data/locations');

var Locations = _interopRequireWildcard(_locations);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sentiment = new _sentiment2.default();

module.exports = function (tweets) {
  function getSignmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  function checkExist(location, array) {
    var found = 0;
    for (var i = 0; i < array.length; i++) {
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
    var scores = [];
    for (var i = 0; i < tweets.length; i++) {
      if (checkExist(tweets[i].location, scores)) {
        var index = 0;
        for (var j = 0; j < scores.length; j++) {
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

    for (var _i = 0; _i < scores.length; _i++) {
      var location = scores[_i].location.toUpperCase();

      // 1st level of extraction: USA States
      // if state code or state name exists in the
      // location text then replace the location by the state
      for (var _j = 0; _j < Locations.StateCodes.length; _j++) {
        if (location.includes(Locations.StateCodes[_j].toUpperCase()) || location.includes(Locations.States[_j].toUpperCase())) {
          scores[_i].location = Locations.States[_j];
          scores[_i].parsed = true;
          scores[_i].local = true;
          scores[_i].score = getSignmoid(scores[_i].score);
        }
      }

      // 2nd level of extraction: World
      // if country name exists in the location text
      // then replace the location by the country
      for (var k = 0; k < Locations.Countries.length; k++) {
        if (location.includes(Locations.Countries[k].toUpperCase())) {
          scores[_i].location = Locations.Countries[k];
          scores[_i].parsed = true;
          scores[_i].local = false;
          scores[_i].score = getSignmoid(scores[_i].score);
        }
      }
    }

    return scores;
  }
  console.log(calculateScores(tweets));
  return calculateScores(tweets);
};
//# sourceMappingURL=getScore.js.map