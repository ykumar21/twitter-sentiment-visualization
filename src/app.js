// npm modules

import express from 'express';
import ejs from 'ejs';
import cookieSession from 'cookie-session';
import passport from 'passport';
import mongoose from 'mongoose';
import socket from 'socket.io';

// Routes
import routes from './routes.js';
import authRoutes from './routes/auth-routes.js';

// The following order must be followed
// for OAuth login to work:
// i) cookieParser
// ii) session
// iii) passport.initialize
// iv) passport.session
// v) app.router

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const altPort = 8080;
const server = app.listen(process.env.PORT || altPort, () => {
  console.log('Listening to port ' + server.address().port);
});

// Setup socket.io
const io = socket(server);
app.set('socket.io', io);

io.on('connection', function(socket) {
  console.log('connection made! ');
});

// Setup OAuth for Google login
const passportSetup = require('./config/passportSetup');

// Connect to remote database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
}).then(() => {
  console.log('connected to mongoose db');
}).catch((err) => {
  console.log(err);
});

// Setup cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 100, // cookie will expire after 1 day
  keys: [process.env.COOKIE_KEY]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
routes(app);
app.use('/auth', authRoutes);
