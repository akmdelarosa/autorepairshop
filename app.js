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
require('./config/passport')(passport);
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

var productCategoryRoute = require('./routes/productCategoryRouteConfig.js');
new productCategoryRoute(app);

var productCategoryRoute = require('./routes/productCategoryRouteConfig.js');
new productCategoryRoute(app);

var passportRoute = require('./routes/passportRouteConfig.js');
new passportRoute(app,passport);

// login routes ======================================================================
//require('./routes/loginRouteConfig.js')(app, passport); // load our routes and pass in our app and fully configured passport

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
