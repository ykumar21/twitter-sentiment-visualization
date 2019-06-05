const express = require('express');
const ejs = require('ejs');
const passport = require('passport');
const mongoose = require('mongoose');

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
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log('Connected to mongodb');
});

const altPort = 8080;
const server = app.listen(process.env.PORT || altPort, () => {
  console.log('Listening to port ' + server.address().port);
});
