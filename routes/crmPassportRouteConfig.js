function crmPassportRouteConfig(app, passport) { 

    this.app = app;
    this.passport = passport;
    this.routeTable = [];
    this.init();
}


crmPassportRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


crmPassportRouteConfig.prototype.processRoutes = function () { 

    var self = this;

    self.routeTable.forEach(function (route) {
    
        if (route.requestType == 'get') {
            
            console.log(route);
            if (route.requestUrl == '/crm/login') {
                self.app.get(route.requestUrl, route.callbackFunction);
            } else {
                self.app.get(route.requestUrl, isLoggedIn, hasPermission, route.callbackFunction);
            }
        }
        else if (route.requestType == 'post') {
            console.log(route);
            if (route.requestUrl == '/crm/login') {
                self.app.post(route.requestUrl, route.callbackFunction);
            } else {
                self.app.post(route.requestUrl, isLoggedIn, hasPermission, route.callbackFunction);
            }            
        }
        else if (route.requestType == 'delete') {
        
            console.log(route);
            self.app.delete(route.requestUrl, isLoggedIn, hasPermission, route.callbackFunction);
        }
    
    });
}


crmPassportRouteConfig.prototype.addRoutes = function () {

    var self = this;
    var moment = require('moment');

    self.routeTable.push({
    
        requestType : 'get',
        requestUrl : '/crm/index',
        callbackFunction : function (request, response) { 
        
            response.render('crm/index.ejs', { title : "Home" , user : request.user, today: moment().format('dddd, LL')}); // load the index.ejs file
        }
    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/login',
        callbackFunction : function (request, response) {
            /*
          if (request.isAuthenticated()) {
            request.flash('warning', 'You are already signed in.');
            response.redirect(request.get('referer'));
          }*/
        
          // render the page and pass in any flash data if it exists
          response.render('crm/login.ejs', { title : "Please login.", message: request.flash('warning')}); 
            
        }
    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/login',
        callbackFunction : self.passport.authenticate('crm-login', {
            successRedirect : '/crm/index', // redirect to the secure crm section
            failureRedirect : '/crm/login', // redirect back to the crm login page if there is an error
            failureFlash : true // allow flash messages
        })
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/logout',
        callbackFunction : function(request, response) {
          request.logout();
          request.flash('sucess', 'You are signed out successfully.');
          response.redirect('/crm/login');
        }
    });

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the login page
    res.redirect('/crm/login');
}

// route middleware to make sure a user is logged in
function hasPermission(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.user.role == 'staff' || req.user.role == 'admin') {
        return next();
    }

    // if they aren't redirect them to the login page
    res.redirect('/crm/login');
}

module.exports = crmPassportRouteConfig;