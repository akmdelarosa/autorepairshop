function adminPassportRouteConfig(app, passport) { 

    this.app = app;
    this.passport = passport;
    this.routeTable = [];
    this.init();
}


adminPassportRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


adminPassportRouteConfig.prototype.processRoutes = function () { 

    var self = this;

    self.routeTable.forEach(function (route) {
    
        if (route.requestType == 'get') {
            
            console.log(route);
            if (route.requestUrl == '/admin/login') {
                self.app.get(route.requestUrl, route.callbackFunction);
            } else {
                self.app.get(route.requestUrl, isLoggedIn, isAdmin, route.callbackFunction);
            }
        }
        else if (route.requestType == 'post') {
            console.log(route);
            if (route.requestUrl == '/admin/login') {
                self.app.post(route.requestUrl, route.callbackFunction);
            } else {
                self.app.post(route.requestUrl, isLoggedIn, isAdmin, route.callbackFunction);
            }            
        }
        else if (route.requestType == 'delete') {
        
            console.log(route);
            self.app.delete(route.requestUrl, isLoggedIn, isAdmin, route.callbackFunction);
        }
    
    });
}


adminPassportRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({
    
        requestType : 'get',
        requestUrl : '/admin/index',
        callbackFunction : function (request, response) { 
        
            response.render('admin/index.ejs', { title : "Home" , user : request.user}); // load the index.ejs file
        }
    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/login',
        callbackFunction : function (request, response) {
            /*
          if (request.isAuthenticated()) {
            request.flash('warning', 'You are already signed in.');
            response.redirect(request.get('referer'));
          }*/
        
          // render the page and pass in any flash data if it exists
          response.render('admin/login.ejs', { title : "Please login.", message: request.flash('warning')}); 
            
        }
    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/login',
        callbackFunction : self.passport.authenticate('admin-login', {
            successRedirect : '/admin/index', // redirect to the secure admin section
            failureRedirect : '/admin/login', // redirect back to the admin login page if there is an error
            failureFlash : true // allow flash messages
        })
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/logout',
        callbackFunction : function(request, response) {
          request.logout();
          request.flash('sucess', 'You are signed out successfully.');
          response.redirect('/admin/login');
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
    res.redirect('/admin/login');
}

// route middleware to make sure a user is logged in
function isAdmin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.user.role == 'admin') {
        return next();
    }

    // if they aren't redirect them to the login page
    res.redirect('/admin/login');
}

module.exports = adminPassportRouteConfig;