/*
*NOTE: This file defines the reservation book schema model. Use this file to add any middlewares, querries, validations ... related to this schema.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// require onther schemas so that we can reference them
var userSchema = require('./user.model.js');
var reservationSchema = require('./reservation.model.js');

//--------------Schema definition---------------//
var RsvpBookSchema =  new Schema({
  admins: { type: [Schema.Types.ObjectId], required: true}, // contains Id of users. At least one user id is required because only registered users can create a book and manage it
  companyName: String,
  employees: [{ // a list of employees and their info
    userId: Schema.Types.ObjectId, // optional
    name: {first: {type: String, required: true}, last: String}, // if userId is available, pull info from id instead
    schedule: [{  // start and end time MUST be multiple of 5 mins using military time, for exmaple: 8000 mean 8:00 am
      Mon: [{start: Number, end: Number}], // multiple start-end intervals in a working day are allowed
      Tue: [{start: Number, end: Number}],
      Wed: [{start: Number, end: Number}],
      Thu: [{start: Number, end: Number}],
      Fri: [{start: Number, end: Number}],
      Sat: [{start: Number, end: Number}],
      Sun: [{start: Number, end: Number}]
    }]
  }],
  services: [String], // these available services help user pick the right one when they rsvp
  hours: {
    Mon: [{start: Number, end: Number}], // multiple start-end intervals in a working day are allowed
    Tue: [{start: Number, end: Number}],
    Wed: [{start: Number, end: Number}],
    Thu: [{start: Number, end: Number}],
    Fri: [{start: Number, end: Number}],
    Sat: [{start: Number, end: Number}],
    Sun: [{start: Number, end: Number}]
  },
  Mon: [Schema.Types.ObjectId], // each week day contain the a list of reservations' id
  Tue: [Schema.Types.ObjectId],
  Wed: [Schema.Types.ObjectId],
  Thu: [Schema.Types.ObjectId],
  Fri: [Schema.Types.ObjectId],
  Sat: [Schema.Types.ObjectId],
  Sun: [Schema.Types.ObjectId],
}, { timeStamp: {createdAt: 'createdAt', updatedAt: 'updatedAt'} });


//--------------Define middlewares for 'pre' and 'post' hooks here---------------//



//----------------Define Virtuals here----------------//

module.exports = {RsvpBookSchema};
