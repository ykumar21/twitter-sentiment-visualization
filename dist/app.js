'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

var _authRoutes = require('./routes/auth-routes.js');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The following order must be followed
// for OAuth login to work:
// i) cookieParser
// ii) session
// iii) passport.initialize
// iv) passport.session
// v) app.router

// Routes
// npm modules

var app = (0, _express2.default)();

app.use(_express2.default.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var altPort = 8080;
var server = app.listen(process.env.PORT || altPort, function () {
  console.log('Listening to port ' + server.address().port);
});

// Setup socket.io
var io = (0, _socket2.default)(server);
app.set('socket.io', io);

io.on('connection', function (socket) {
  console.log('connection made! ');
});

// Setup OAuth for Google login
var passportSetup = require('./config/passportSetup');

// Connect to remote database
_mongoose2.default.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
}).then(function () {
  console.log('connected to mongoose db');
}).catch(function (err) {
  console.log(err);
});

// Setup cookies
app.use((0, _cookieSession2.default)({
  maxAge: 24 * 60 * 60 * 100, // cookie will expire after 1 day
  keys: [process.env.COOKIE_KEY]
}));

// Initialize passport
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

// set up routes
(0, _routes2.default)(app);
app.use('/auth', _authRoutes2.default);
//# sourceMappingURL=app.js.map