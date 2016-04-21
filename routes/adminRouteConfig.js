var adminUserModel = require('../server/model/adminUserModel.js');
function adminRouteConfig(app) { 

    this.app = app;
    this.routeTable = [];
    this.init();
}


adminRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


adminRouteConfig.prototype.processRoutes = function () { 

    var self = this;

    self.routeTable.forEach(function (route) {

        if (route.requestType == 'get') {
            
            self.app.get(route.requestUrl, isLoggedIn, isAdmin, route.callbackFunction);
        }
        else if (route.requestType == 'post') {
        
            self.app.post(route.requestUrl, isLoggedIn, isAdmin, route.callbackFunction);
        }
        else if (route.requestType == 'delete') {
        
            self.app.delete(route.requestUrl, isLoggedIn, isAdmin, route.callbackFunction);
        }
    
    });
}


adminRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/index',
        callbackFunction : function(request, response) {
          response.render('admin/index.ejs', {
            user : request.user, // get the user out of session and pass to template
            message : request.flash('warning'),
            title : 'Home'
          });
        }
    });


    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/services/index',
        callbackFunction : function(request, response) {
          var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
                        
            vehicleServicesModel.vehicleServicesModel.getAllServices(
                function (status) { 
                    response.render('admin/services/index.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Manage Services',
                    services : status
                }); 

            });
          
          
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/services/edit/:id',
        callbackFunction : function(request, response) {
           
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
                        
            vehicleServicesModel.vehicleServicesModel.getServiceById(request.params.id,
                function (service) {
                    console.log(service);
                    var partModel = require('../server/model/partModel.js');
                    partModel.partModel.getPartsByServiceId(service.id,
                    function (parts) {
                        console.log(parts);
                        response.render('admin/services/edit.ejs', {
                        user : request.user, // get the user out of session and pass to template
                        title: 'Edit Service',
                        service : service,
                        serviceParts : parts
                        }); 
                    });
                    
                });
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/services/updateService',
        callbackFunction : function(request, response) {
           
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
                        
            vehicleServicesModel.vehicleServicesModel.updateServiceById(request.body.service,request.body.service.id,
                function (status) { 
                    response.json(status);
                });
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/services/removeServicePart',
        callbackFunction : function(request, response) {
           
            var partModel = require('../server/model/partModel.js');
                        
            partModel.partModel.removeServicePart(request.body.servicePartId,
                function (status) { 
                    response.json(status);
                });
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/services/createService',
        callbackFunction : function(request, response) {
           
            response.render('admin/services/create.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Create Service'
                    }); 
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/services/createService',
        callbackFunction : function(request, response) {
           console.log(request.body.service);
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
                        
            vehicleServicesModel.vehicleServicesModel.createService(request.body.service,
                function (status) {
                    response.json(status);
                });
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/parts/index',
        callbackFunction : function(request, response) {
            
            
            var partModel = require('../server/model/partModel.js');
                        
            partModel.partModel.getAllParts(
                function (status) { 
					console.log(status);
                    response.render('admin/parts/index.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Manage Parts',
                    parts : status
                    });

                });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/parts/edit/:id',
        callbackFunction : function(request, response) {
            
            var partModel = require('../server/model/partModel.js');
                        
            partModel.partModel.getPartById(request.params.id,
                function (status) { 
					console.log(status);
                    response.render('admin/parts/edit.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Edit Part',
                    part : status
                    });

                });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/parts/updatePart',
        callbackFunction : function(request, response) {
           
            var partModel = require('../server/model/partModel.js');
                        
            partModel.partModel.updatePartById(request.body.part,request.body.part.id,
                function (status) { 
                    response.json(status);
                });
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/parts/createPart',
        callbackFunction : function(request, response) {
           
            response.render('admin/parts/create.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Create Part'
                    }); 
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/parts/createPart',
        callbackFunction : function(request, response) {
           console.log(request.body.part);
            var partModel = require('../server/model/partModel.js');
                        
            partModel.partModel.createPart(request.body.part,
                function (status) {
                    response.json(status);
                });
            
        }

    });
	
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/viewAllAppointments',
        callbackFunction : function(request, response) {
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.getAllAppointments(
                function (status) {
                    response.json({appointments : status});
            });
        }

    });
    
    //getAllAppointmentsServices
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/getAllAppointmentsServices',
        callbackFunction : function(request, response) {
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.getAllAppointmentsServices(
                function (status) {
                    console.log(status);
                    response.json({services : status});
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/appointments/index',
        callbackFunction : function(request, response) {
            response.render('admin/appointments/index.ejs', {
            user : request.user, // get the user out of session and pass to template
            title: 'Manage Appointments'
          });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/appointments/edit/:id',
        callbackFunction : function(request, response) {
           /* 
            var userModel = require('../server/model/userModel.js');
                        
            userModel.userModel.updateUser(request.body.user, request.user.id,
                function (status) { 
                    response.json(status); 

            });
            */
        }

    });
	var moment = require('moment');
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/appointments/edit/:id',
        callbackFunction : function(request, response) {
            
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.getAppointment(request.params.id,
                function (status) { 
                    //response.json(status); 
                    response.render('admin/appointments/edit.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Edit Appointment',
                    appointment : status,
                    moment : moment
                    });

            });
            
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/users/index',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
                        
            userModel.userModel.getAllUsers(
                function (status) {
					console.log(status);
                    response.render('admin/users/index.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Manage Users',
                    users : status
                    });

            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/users/getAllUsers',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
                        
            userModel.userModel.getAllUsers(
                function (status) {
					response.json({ users : status });

            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/users/deleteUserVehicle/',
        callbackFunction : function(request, response) {
           
            var userModel = require('../server/model/userModel.js');
            
            console.log(request);
                        
            userModel.userModel.deleteUserVehicle(request.body.userId, request.body.vehicleId,
                function (status) { 
                    response.json(status); 

            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/users/edit/:id',
        callbackFunction : function(request, response) {
           
            var userModel = require('../server/model/userModel.js');
            var vehicleModel = require('../server/model/vehicleModel.js');
            userModel.userModel.getUserById(request.params.id,
                function (user) {
                    console.log("user below");
                    console.log(user);
                    vehicleModel.vehicleModel.getUserVehiclesByUserId(user.id,
                    function(vehicles) {
                        console.log(vehicles);
                        response.render('admin/users/edit.ejs', {
                        user : request.user,
                        userProfile : user,
                        vehicles : vehicles,
                        title: 'Edit User',
                    });
                });
            
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/user/edit',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
            console.log(request.body.user);
            userModel.userModel.updateUser(request.body.user, request.body.user.id,
                function (status) { 
                    response.json(status); 

            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/profile/edit',
        callbackFunction : function(request, response) {
            
            response.render('admin/profile/edit.ejs', {
                user : request.user, // get the user out of session and pass to template
                title: 'Edit Profile',
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/vehicles/index',
        callbackFunction : function(request, response) {
            var vehicleModel = require('../server/model/vehicleModel.js');
            vehicleModel.vehicleModel.getAllVehicles(
                function (vehicles) {
                    
                    response.render('admin/vehicles/index.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title : 'Manage Vehicles',
                    vehicles : vehicles
                    });
            
          });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/vehicles/edit/:id',
        callbackFunction : function(request, response) {
            
           var vehicleModel = require('../server/model/vehicleModel.js');
           vehicleModel.vehicleModel.updateVehicleById(request.body.vehicle, request.params.id,
           function (status) {
               response.json(status);
           });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/vehicles/edit/:id',
        callbackFunction : function(request, response) {
           var vehicleModel = require('../server/model/vehicleModel.js');
           vehicleModel.vehicleModel.getVehicleById(request.params.id,
           function (vehicle) {
               response.render('admin/vehicles/edit.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title : 'Edit Vehicle',
                    vehicle : vehicle                    
                });
           });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/vehicles/getVehiclesList',
        callbackFunction : function(request, response) {
           var vehicleModel = require('../server/model/vehicleModel.js');
           vehicleModel.vehicleModel.getAllVehicles(
           function (vehicles) {
               response.json(vehicles);
           });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/vehicles/createVehicle',
        callbackFunction : function(request, response) {
           var vehicleModel = require('../server/model/vehicleModel.js');
           vehicleModel.vehicleModel.createVehicle(request.body.vehicle,
           function (status) {
               response.json(status);
           });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/vehicles/createVehicle',
        callbackFunction : function(request, response) {
           response.render('admin/vehicles/create.ejs', {
                user : request.user, // get the user out of session and pass to template
                title : 'Create Vehicle'            
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/prices/getAllPartsPrices',
        callbackFunction : function(request, response) {
            var partModel = require('../server/model/partModel.js');
            partModel.partModel.getAllPartsPrices(
                function (prices) {
                    
                    response.json(prices);
            
          });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/prices/index',
        callbackFunction : function(request, response) {
            response.render('admin/prices/index.ejs', {
                user : request.user, // get the user out of session and pass to template
                title : 'Manage Prices'
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/admin/prices/edit/:id',
        callbackFunction : function(request, response) {
            var partModel = require('../server/model/partModel.js');
            partModel.partModel.getPriceById(request.params.id,
              function (price) {
                response.render('admin/prices/edit.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title : 'Edit Price',
                    price : price
                });
             });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/admin/prices/edit/:id',
        callbackFunction : function(request, response) {
            var partModel = require('../server/model/partModel.js');
            partModel.partModel.updatePriceById(request.body.price, request.params.id,
              function (status) {
                response.json(status);
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
    res.redirect('/admin/login');
}

// route middleware to make sure a user is logged in
function isAdmin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.user.role == 'admin') {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/admin/login');
}

module.exports = adminRouteConfig;