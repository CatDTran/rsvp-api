/*
*NOTE: This is the configuration file for Mongoose. All configurations for setting up Mongoose should go here
*/
var config = require('./config.js'), mongoose = require('mongoose');
module.exports = function(){
  var db = mongoose.connect(config.db);
  require('../app/models/user.model.js');
  require('../app/models/reservation.model.js');
  require('../app/models/rsvpbook.model.js');
  return db;
}
