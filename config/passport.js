// config/passport.js
var connectionProvider = require('../server/mysqlConnectionStringProvider.js');				
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy

// load up the user model
var userModel = require('../server/model/userModel.js');

// load up the adminUser model
var adminUserModel = require('../server/model/adminUserModel.js');

var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

var bcrypt   = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query("select * from users where id = ?",[id],function(err,rows){	
			done(err, rows[0]);
		});
    });
	


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        req.checkBody("email", "Enter a valid email address.").isEmail();
        var errors = req.validationErrors();
        if (errors) {
            return done(null, false, req.flash('warning', errors[0].msg)); 
        } else {
        // normal processing here

        // asynchronous
        // getUserByEmail wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        userModel.userModel.getUserByEmail (email, function (err, user) {
            if (err) {
                return done(err);
            }

            // check to see if theres already a user with that email
            if ( user.length ) {
            //if (user.id) {
                return done(null, false, req.flash('warning', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user using the model
                var signupParams = {   
                    email : email,
                    password : password,
                };
                
                var newUser = new Object();
                
                userModel.userModel.signUpUser (signupParams, function (rows) {
                    newUser.id = rows.insertId;
                    return done(null, newUser);
                });
            }
                        
        });

        });
        }

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        req.checkBody("email", "Enter a valid email address.").isEmail();
        var errors = req.validationErrors();
        if (errors) {
            return done(null, false, req.flash('warning', errors[0].msg)); 
        } else {
            // normal processing here
            
            userModel.userModel.getUserByEmail (email, function (err, rows) {
                if (err) {
                    return done(err);
                }
                console.log('login rows below');
                console.log(rows);
                if (!rows.length) {
                    // req.flash is the way to set flashdata using connect-flash
                    return done(null, false, req.flash('warning', 'No user found.')); 
                }
                
                // if the user is found but the password is wrong
                var thisPassword = userModel.userModel.generateHash(password);
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    console.log('password given below');
                    console.log(thisPassword);
                    console.log('the password saved below');
                    console.log(rows[0].password)
                    // create the loginMessage and save it to session as flashdata
                    return done(null, false, req.flash('warning', 'Oops! Wrong password.')); 
                }

                // all is well, return successful user
                return done(null, rows[0]);	
                            
            });
        }

    }));
    

    // =========================================================================
    // ADMIN LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('admin-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        console.log("admin-login");
        req.checkBody("email", "Enter a valid email address.").isEmail();
        var errors = req.validationErrors();
        if (errors) {
            return done(null, false, req.flash('warning', errors[0].msg)); 
        } else {
            // normal processing here
            
            adminUserModel.adminUserModel.getUserByEmail (email, function (err, rows) {
                if (err) {
                    return done(err);
                }
                console.log('login rows below from admin-login');
                console.log(rows);
                if (!rows.length) {
                    // req.flash is the way to set flashdata using connect-flash
                    return done(null, false, req.flash('warning', 'No user found.')); 
                }
                
                // if the user is found but the password is wrong
                var thisPassword = adminUserModel.adminUserModel.generateHash(password);
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    console.log('password given below');
                    console.log(thisPassword);
                    console.log('the password saved below');
                    console.log(rows[0].password)
                    // create the loginMessage and save it to session as flashdata
                    return done(null, false, req.flash('warning', 'Oops! Wrong password.')); 
                }

                // all is well, return successful user
                return done(null, rows[0]);	
                            
            });
        }

    }));

};