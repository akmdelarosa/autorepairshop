function passportRouteConfig(app, passport) { 

    this.app = app;
    this.passport = passport;
    this.routeTable = [];
    this.init();
}


passportRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


passportRouteConfig.prototype.processRoutes = function () { 

    var self = this;

    self.routeTable.forEach(function (route) {
    
        if (route.requestType == 'get') {
            
            console.log(route);
            if(route.requestUrl =='/logout') {
                self.app.get(route.requestUrl, isLoggedIn, route.callbackFunction);
            } else {
                self.app.get(route.requestUrl, route.callbackFunction);
            }
        }
        else if (route.requestType == 'post') {
        
            console.log(route);
            self.app.post(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'delete') {
        
            console.log(route);
            self.app.delete(route.requestUrl, route.callbackFunction);
        }
    
    });
}


passportRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({
    
        requestType : 'get',
        requestUrl : '/',
        callbackFunction : function (request, response) { 
        
            response.render('index.ejs', { title : "Home" }); // load the index.ejs file
        }
    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/login',
        callbackFunction : function (request, response) {
          if (request.isAuthenticated() && request.user.role == 'customer') {
            request.flash('warning', 'You are already signed in.');
            response.redirect(request.get('referer'));
          }
        
          // render the page and pass in any flash data if it exists
          response.render('login.ejs', { title : "Please login.", message: request.flash('warning')}); 
            
        }
    });

    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/login',
        callbackFunction : self.passport.authenticate('local-login', {
            successRedirect : '/profile/index', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        })
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/signup',
        callbackFunction : function (request, response) {
          if (request.isAuthenticated()) { response.redirect('/'); }
          // render the page and pass in any flash data if it exists
          response.render('signup.ejs', { message: request.flash('warning') });
        }
    });

    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/signup',
        callbackFunction : self.passport.authenticate('local-signup', {
          successRedirect : '/profile/edit', // redirect to the secure profile section
          failureRedirect : '/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
        })
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/logout',
        callbackFunction : function(request, response) {
          request.logout();
          response.redirect('/');
        }
    })

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = passportRouteConfig;