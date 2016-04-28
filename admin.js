/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var validator = require('express-validator');
var moment = require('moment');
var passportConfig = require('./config/passport');
new passportConfig(passport);

var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');
var config = wellknown('Gmail');
var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'akmdelarosa@gmail.com',
    pass: 'Jhel@ih0717'
  }
});


var admin = module.exports = express();  
    
// all environments

admin.use(cookieParser()); // read cookies (needed for auth)
admin.use(bodyParser()); // get information from html forms
admin.use(bodyParser.urlencoded({ extended: false }));
admin.use(validator());

admin.set('port', process.env.PORT || 3000);
admin.set('views', path.join(__dirname, 'views'));
admin.engine('html', require('ejs').renderFile);
admin.set('view engine', 'ejs');
admin.use(express.favicon());
admin.use(express.logger('dev'));
admin.use(express.json());
admin.use(express.urlencoded());
admin.use(express.methodOverride());
//admin.use(express.session({ secret: 'keyboard cat' })); //session secret
// Initialize Passport and restore authentication state, if any, from the
// session.
admin.use(session({ secret: 'admin keyboard cat' })); // session secret
admin.use(passport.initialize());
admin.use(passport.session());
admin.use(flash()); // use connect-flash for flash messages stored in session
admin.use(admin.router);

admin.use(require('stylus').middleware(path.join(__dirname, 'public')));
admin.use(express.static(path.join(__dirname, 'public')));

admin.use('/bower_components', express.static(path.join(__dirname ,'bower_components')));

admin.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// development only
if ('development' == admin.get('env')) {
    admin.use(express.errorHandler());
}

var adminPassportRoute = require('./routes/adminPassportRouteConfig.js');
new adminPassportRoute(admin,passport);

var adminRoute = require('./routes/adminRouteConfig.js');
new adminRoute(admin);

module.exports = admin;