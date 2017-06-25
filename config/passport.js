/*
*NOTE: This is the configuration file for Passport. All configurations for setting up Passport should go here
*/
var config = require('./config'),
    mongoose = require('mongoose')
    passport = require('passport');

// Import neccessary login strategries here
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// Import database models here
var User = require('../app/models/user.model.js');
var Reservation =  require('../app/models/reservation.model.js');
var RsvpBook = require('../app/models/rsvpbook.model.js');

module.exports = function(passport){

  // =========================================================================
  // passport session setup ==================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

  // =========================================================================
  // Local Sign up ==================================================
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done){
    process.nextTick(function() {
      User.findOne( {'local.email': email}, function(err, user){
        // if error occurs, call done
        if (err) return done(err);
        // if user with this email already exist, flash message
        if (User){
          return done(null, false, req.flash('signUpMessage', 'This email has already been used! Please try another email'));
        } else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          // actually save new user to the database
          newUser.save(function(err){
            if (err) throw err;
            return done (null, newUser);
          });
        }
      });
    });
  }));


}
