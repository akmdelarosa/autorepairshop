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

//var passport = require('passport');

//var passport = require('./config/passport');
//require('./config/passport');

var crm = express();

// all environments

crm.use(cookieParser()); // read cookies (needed for auth)
crm.use(bodyParser()); // get information from html forms
crm.use(bodyParser.urlencoded({ extended: false }));
crm.use(validator());

crm.set('port', process.env.PORT || 3000);
crm.set('views', path.join(__dirname, 'views'));
crm.engine('html', require('ejs').renderFile);
crm.set('view engine', 'ejs');
crm.use(express.favicon());
crm.use(express.logger('dev'));
crm.use(express.json());
crm.use(express.urlencoded());
crm.use(express.methodOverride());
//crm.use(express.session({ secret: 'keyboard cat' })); //session secret
// Initialize Passport and restore authentication state, if any, from the
// session.
crm.use(session({ secret: 'crm router cat' })); // session secret
crm.use(passport.initialize());
crm.use(passport.session());
crm.use(flash()); // use connect-flash for flash messages stored in session
crm.use(crm.router);

crm.use(require('stylus').middleware(path.join(__dirname, 'public')));
crm.use(express.static(path.join(__dirname, 'public')));

crm.use('/bower_components', express.static(path.join(__dirname ,'bower_components')));

crm.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// development only
if ('development' == crm.get('env')) {
    crm.use(express.errorHandler());
}


var crmPassportRoute = require('./routes/crmPassportRouteConfig.js');
new crmPassportRoute(crm,passport);

var crmRoute = require('./routes/crmRouteConfig.js');
new crmRoute(crm);

module.exports = crm;