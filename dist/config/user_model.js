'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  googleId: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;
//# sourceMappingURL=user_model.js.map