'use strict';
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

var app = express();

// all environments

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(express.session({ secret: 'keyboard cat' })); //session secret
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(session({ secret: 'keyboard cat' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(app.router);

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bower_components', express.static(path.join(__dirname ,'bower_components')));
app.use('/images', express.static(path.join(__dirname ,'public/images')));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/hoursandmap', routes.hoursandmap);
app.get('/meetthestaff', routes.meetthestaff);

var productCategoryRoute = require('./routes/productCategoryRouteConfig.js');
new productCategoryRoute(app);

var passportRoute = require('./routes/passportRouteConfig.js');
new passportRoute(app,passport);

var adminPassportRoute = require('./routes/adminPassportRouteConfig.js');
new adminPassportRoute(app,passport);

var crmPassportRoute = require('./routes/crmPassportRouteConfig.js');
new crmPassportRoute(app,passport);

var profileRoute = require('./routes/profileRouteConfig.js');
new profileRoute(app);

var adminRoute = require('./routes/adminRouteConfig.js');
new adminRoute(app);

var crmRoute = require('./routes/crmRouteConfig.js');
new crmRoute(app);

var appointmentRoute = require('./routes/appointmentRouteConfig.js');
new appointmentRoute(app);

var vehicleRoute = require('./routes/vehicleRouteConfig.js');
new vehicleRoute(app);

var serviceRoute = require('./routes/serviceRouteConfig.js');
new serviceRoute(app);

var estimatorToolRoute = require('./routes/estimatorToolRouteConfig');
new estimatorToolRoute(app);
// login routes ======================================================================
//require('./routes/loginRouteConfig.js')(app, passport); // load our routes and pass in our app and fully configured passport

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
