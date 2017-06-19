/*
*NOTE: This is the configuration file for Express. All configurations for setting up Express should go here
*/
var config = require('./config.js'),
    express = require('express'),
    bodyParser = require("body-parser"),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(){
  var app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(session({
    saveUninitilized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  // set views template directories and engine
  app.set('views', './app/views');
  app.set('view engine', 'pug');

  // set up passport module for authentication here
  /*app.use(passport.initilize()); // register midleware to bootstrap passport module
  app.use(passport.session());  // register midleware which uses Express's session to keep track of user's session*/

  // set the public directory which contains angular 2 browser code
  app.use(express.static('./public'));

  // set routes files for Express app
  require('../app/routes/users.routes.js')(app);
  require('../app/routes/reservations.routes.js')(app);
  require('../app/routes/rsvpbooks.routes.js')(app);

  return app;
};
