module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/profile', function(req, res) {
    if ('user' in req) {
      res.send('Hey ' + req.user.username + '!');
    } else {
      res.status(401).send('Unauthorized!');
    }
  });
};
