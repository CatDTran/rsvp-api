/*
*NOTE: This file defines the reservations schema model. Use this file to add any middlewares, querries, validations ... related to this schema.
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// require onther schemas so that we can reference them
var rsvpBookSchema = require('./rsvpbook.model.js');
var userSchema = require('./user.model.js');

//--------------Schema definition---------------//
var ReservationSchema = new Schema({
  bookedBy: {
    userId: { type: Schema.Types.ObjectId, required: true}, // userId required because user MUST login to make reservation
    name: {first: String, last: String} // For consitency, this field should be filled by pulling info from userId
  },
  bookedFor: {
    userId: Schema.Types.ObjectId,  // optional
    name: {first: String, last: String} // for consistency this field should be filled from the employees list from RsvpBook's employees[]
  },
  bookBelong: { type: Schema.Types.ObjectId, required: true}, // a reservation must belong to a RsvpBook
  description: String, // optional description about this reservation
  service: { type: String, ref: rsvpBookSchema.services }, // service must be picked from available services from the respective book
  startTime: {type: Date, required: true}, // a reservation must have a starting time
  endTime: {type: Date, default: 30}// optional, should be calcualted from the service duration and startTime. Default value is 30 mins
}, { timeStamp: {createdAt: 'createdAt', updatedAt: 'updatedAt'} }); // timeStamp will be generated by mongoose


//--------------Define middlewares for 'pre' and 'post' hooks here---------------//


//----------------Define Virtuals here----------------//



module.exports = {ReservationSchema};
