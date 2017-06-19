//The name of the app should "inKepper" or "Resvp.Me" or "inKepper.Me"
process.env.NODE_ENV = 'development'; // set equal to 'develoopment' or 'production'

var mongoose = require('./config/mongoose.js');
    express = require('./config/express.js'),
    passport = require('./config/passport.js');

var db = mongoose();
var app = express();
var passport = passport();

var port  = 3000;
app.listen(port);
module.exports = app;
console.log('Sever running at port ' + port);
