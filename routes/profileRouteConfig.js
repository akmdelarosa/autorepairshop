function profileRouteConfig(app) { 

    this.app = app;
    this.routeTable = [];
    this.init();
}


profileRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


profileRouteConfig.prototype.processRoutes = function () { 

    var self = this;

    self.routeTable.forEach(function (route) {

        if (route.requestType == 'get') {
            
            self.app.get(route.requestUrl, isLoggedIn, route.callbackFunction);
        }
        else if (route.requestType == 'post') {
        
            self.app.post(route.requestUrl, isLoggedIn, route.callbackFunction);
        }
        else if (route.requestType == 'delete') {
        
            self.app.delete(route.requestUrl, isLoggedIn, route.callbackFunction);
        }
    
    });
}


profileRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/profile/index',
        callbackFunction : function(request, response) {
          response.render('profile/index.ejs', {
            user : request.user, // get the user out of session and pass to template
            message : request.flash('warning'),
            title : 'Home'
          });
        }
    });


    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/profile/edit',
        callbackFunction : function(request, response) {
          response.render('profile/edit.ejs', {
            user : request.user, // get the user out of session and pass to template
            title: 'Edit User Profile',
            message : request.flash('success')
          });
          
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/profile/edit',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
            console.log(request.body.user);
            userModel.userModel.updateUser(request.body.user, request.user.id,
                function (status) { 
                    response.json(status); 

            });
        }

    });
	
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/profile/getCurrentUserVehicles',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
                        
            userModel.userModel.getVehicles(request.user.id,
                function (status) { 
					console.log(status);
                    response.json({vehicles: status}); 

            });
        }

    });
	
	//getCurrentUserAppointments
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/profile/getCurrentUserAppointments',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
                        
            userModel.userModel.getAppointments(request.user.id,
                function (status) { 
					console.log(status);
                    response.json({appointments: status}); 

            });
        }

    });
	
	//getCurrentUserServiceHistory
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/profile/getCurrentUserServiceHistory',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
                        
            userModel.userModel.getServiceHistory(request.user.id,
                function (status) { 
					console.log(status);
                    response.json({services: status}); 

            });
        }

    });
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

module.exports = profileRouteConfig;