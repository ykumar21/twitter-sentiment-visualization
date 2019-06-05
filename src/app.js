// npm modules

const express = require('express');
const ejs = require('ejs');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

// Routes
const routes = require('./routes.js');
const authRoutes = require('./routes/auth-routes.js');

const app = express();

// set up routes
routes(app);
app.use('/auth', authRoutes);

app.use(express.static('public'));
app.set('view engine', 'ejs');

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
  key: [process.env.COOKIE_KEY]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

const altPort = 8080;
const server = app.listen(process.env.PORT || altPort, () => {
  console.log('Listening to port ' + server.address().port);
});
