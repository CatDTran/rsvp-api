//The name of the app should "inKepper" or "Resvp.Me" or "inKepper.Me"
process.env.NODE_ENV = 'development'; // set equal to 'develoopment' or 'production'

// Declarations =============================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');


var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// configuration ===============================================================

var configDB = require('./config/env/development.js');
mongoose.connect(configDB.db);

// configurations for Express
app.use(morgan('dev'))
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('views', './app/views');
app.set('view engine', 'ejs'); // set up ejs for templatingapp.set('views', '../app/views');

// required for passport
app.use(session({ secret: 'fusrodah' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
require('./app/routes/routes.js')(app, passport); // set routes files for Express app
require('./config/passport.js')(passport); // pass passport for configuration


// start up server
var port  = 3000;
app.listen(port);
module.exports = app;
console.log('Sever running at port ' + port);
