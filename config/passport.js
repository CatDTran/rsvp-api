/*
*NOTE: This is the configuration file for Passport. All configurations for setting up Passport should go here
*/var config = require('./config'),
    mongoose = require('mongoose');

    module.exports = function(){
      var db = mongoose.connect(config.db);

      
      require('../app/models/user.model.js');
      require('../app/models/reservation.model.js');
      require('../app/models/rsvpbook.model.js');

      return db;
    }
