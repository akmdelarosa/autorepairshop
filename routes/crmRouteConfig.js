var staffUserModel = require('../server/model/staffUserModel.js');
function crmRouteConfig(app) {

    this.app = app;
    this.routeTable = [];
    this.init();
}


crmRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


crmRouteConfig.prototype.processRoutes = function () { 

    var self = this;

    self.routeTable.forEach(function (route) {

        if (route.requestType == 'get') {
            
            self.app.get(route.requestUrl, isLoggedIn, hasPermission, route.callbackFunction);
        }
        else if (route.requestType == 'post') {
        
            self.app.post(route.requestUrl, isLoggedIn, hasPermission, route.callbackFunction);
        }
        else if (route.requestType == 'delete') {
        
            self.app.delete(route.requestUrl, isLoggedIn, hasPermission, route.callbackFunction);
        }
    
    });
}


crmRouteConfig.prototype.addRoutes = function () {

    var self = this;
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm',
        callbackFunction : function(request, response) {
            response.redirect('/crm/index');
        }

    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/profile/index',
        callbackFunction : function(request, response) {
            response.render('crm/profile/index.ejs', {
                user : request.user, // get the user out of session and pass to template
                title: 'My Profile'
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/profile/edit',
        callbackFunction : function(request, response) {
            
            response.render('crm/profile/edit.ejs', {
                user : request.user, // get the user out of session and pass to template
                title: 'Edit My Profile',
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/getAppointmentsByDate/:date',
        callbackFunction : function(request, response) {
            console.log('date: ' + request.params.date); 
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.getAppointmentsByDate(request.params.date,
                function (err, status) {
                    if (err) {
                        response.json({error : err.code});
                    } else {
                        response.json({appointments : status});
                    }
                    
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/getAppointmentsServicesByDate/:date',
        callbackFunction : function(request, response) {
            var appointmentModel = require('../server/model/appointmentModel.js');
            console.log('date: ' + request.params.date); 
            appointmentModel.appointmentModel.getAllAppointmentsServices(request.params.date,
                function (err,status) {
                    
                    if (err) {
                        response.json({error : err.code});
                    } else {
                        response.json({services : status});
                    }
            });
        }

    });
    
    //getAllAppointmentsServices
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/appointments/today',
        callbackFunction : function(request, response) {
            response.render('crm/appointments/today.ejs', {
                user : request.user, // get the user out of session and pass to template
                title: 'Today\'s Appointment'
                }); 
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/user/edit',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
            userModel.userModel.updateUser(request.body.user, request.body.user.id,
                function (status) { 
                    response.json(status); 

            });
        }

    });
    /*
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/services/updateService',
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
        requestUrl : '/crm/services/removeServicePart',
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
        requestUrl : '/crm/services/createService',
        callbackFunction : function(request, response) {
           
            response.render('crm/services/create.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Create Service'
                    }); 
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/services/createService',
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
        requestUrl : '/crm/parts/index',
        callbackFunction : function(request, response) {
            
            
            var partModel = require('../server/model/partModel.js');
                        
            partModel.partModel.getAllParts(
                function (err, status) { 
                    if (err) {
                        request.flash('error', "There was an error while processing your request");
                        response.render('crm/parts/index.ejs', {
                        user : request.user, // get the user out of session and pass to template
                        title: 'Manage Parts',
                        parts : [],
                        message : request.flash('error')
                        });
                    } else {
                       response.render('crm/parts/index.ejs', {
                        user : request.user, // get the user out of session and pass to template
                        title: 'Manage Parts',
                        parts : status
                        }); 
                    }                    

                });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/parts/edit/:id',
        callbackFunction : function(request, response) {
            
            var partModel = require('../server/model/partModel.js');
                        
            partModel.partModel.getPartById(request.params.id,
                function (status) { 
					console.log(status);
                    response.render('crm/parts/edit.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Edit Part',
                    part : status
                    });

                });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/parts/updatePart',
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
        requestUrl : '/crm/parts/createPart',
        callbackFunction : function(request, response) {
           
            response.render('crm/parts/create.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Create Part'
                    }); 
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/parts/createPart',
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
        requestUrl : '/crm/viewAllAppointments',
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
        requestUrl : '/crm/getAllAppointmentsServices',
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
        requestUrl : '/crm/appointments/index',
        callbackFunction : function(request, response) {
            response.render('crm/appointments/index.ejs', {
            user : request.user, // get the user out of session and pass to template
            title: 'Manage Appointments'
          });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/appointments/edit/:id',
        callbackFunction : function(request, response) {
           
            var userModel = require('../server/model/userModel.js');
                        
            userModel.userModel.updateUser(request.body.user, request.user.id,
                function (status) { 
                    response.json(status); 

            });
            
        }

    });
	var moment = require('moment');
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/appointments/edit/:id',
        callbackFunction : function(request, response) {
            
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.getAppointment(request.params.id,
                function (status) { 
                    //response.json(status); 
                    response.render('crm/appointments/edit.ejs', {
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
        requestUrl : '/crm/users/index',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
                        
            userModel.userModel.getAllUsers(
                function (status) {
					console.log(status);
                    response.render('crm/users/index.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Manage Users',
                    users : status
                    });

            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/users/getAllUsers',
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
        requestUrl : '/crm/users/deleteUserVehicle/',
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
        requestUrl : '/crm/users/edit/:id',
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
                        response.render('crm/users/edit.ejs', {
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
        requestUrl : '/crm/user/edit',
        callbackFunction : function(request, response) {
            
            var userModel = require('../server/model/userModel.js');
            userModel.userModel.updateUser(request.body.user, request.body.user.id,
                function (status) { 
                    response.json(status); 

            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/vehicles/index',
        callbackFunction : function(request, response) {
            var vehicleModel = require('../server/model/vehicleModel.js');
            vehicleModel.vehicleModel.getAllVehicles(
                function (vehicles) {
                    
                    response.render('crm/vehicles/index.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title : 'Manage Vehicles',
                    vehicles : vehicles
                    });
            
          });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/vehicles/edit/:id',
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
        requestUrl : '/crm/vehicles/edit/:id',
        callbackFunction : function(request, response) {
           var vehicleModel = require('../server/model/vehicleModel.js');
           vehicleModel.vehicleModel.getVehicleById(request.params.id,
           function (vehicle) {
               response.render('crm/vehicles/edit.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title : 'Edit Vehicle',
                    vehicle : vehicle                    
                });
           });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/vehicles/getVehiclesList',
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
        requestUrl : '/crm/vehicles/createVehicle',
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
        requestUrl : '/crm/vehicles/createVehicle',
        callbackFunction : function(request, response) {
           response.render('crm/vehicles/create.ejs', {
                user : request.user, // get the user out of session and pass to template
                title : 'Create Vehicle'            
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/prices/getAllPartsPrices',
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
        requestUrl : '/crm/prices/index',
        callbackFunction : function(request, response) {
            response.render('crm/prices/index.ejs', {
                user : request.user, // get the user out of session and pass to template
                title : 'Manage Prices'
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/prices/edit/:id',
        callbackFunction : function(request, response) {
            var partModel = require('../server/model/partModel.js');
            partModel.partModel.getPriceById(request.params.id,
              function (price) {
                response.render('crm/prices/edit.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title : 'Edit Price',
                    price : price
                });
             });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/prices/edit/:id',
        callbackFunction : function(request, response) {
            var partModel = require('../server/model/partModel.js');
            partModel.partModel.updatePriceById(request.body.price, request.params.id,
              function (status) {
                response.json(status);
             });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/prices/createPrice',
        callbackFunction : function(request, response) {
           response.render('crm/prices/create.ejs', {
                user : request.user, // get the user out of session and pass to template
                title : 'Create Vehicle Part and Price'            
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/prices/createPrice',
        callbackFunction : function(request, response) {
           var partModel = require('../server/model/partModel.js');
            partModel.partModel.createVehiclePartPrice(request.body.vehiclePartPrice,
              function (err, status) {
                  if (err) {
                      response.json({error: err.code});
                  } else {
                      response.json({status : 'success'});
                  }
             });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/prices/getAllParts',
        callbackFunction : function(request, response) {
            var partModel = require('../server/model/partModel.js');
            partModel.partModel.getAllParts(
              function (err, status) {
                  if (err) {
                      response.json({error: err.code});
                  } else {
                      response.json({parts : status});
                  }
             });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/rates/index',
        callbackFunction : function(request, response) {
            response.render('crm/rates/index.ejs', {
                user : request.user, // get the user out of session and pass to template
                title : 'Manage Service Rates'
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/rates/getAllServicesRates',
        callbackFunction : function(request, response) {
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
            vehicleServicesModel.vehicleServicesModel.getAllServicesRates(
              function (err, status) {
                  if (err) {
                      response.json({error: err.code});
                  } else {
                      response.json(status);
                  }
             });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/rates/edit/:id',
        callbackFunction : function(request, response) {
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
            vehicleServicesModel.vehicleServicesModel.getServiceRateById(request.params.id,
              function (err, rate) {
                  if (err) {
                      response.flash('error', "An error has occured while processing your request.");
                      response.redirect('/crm/rates/index');
                  } else {
                      console.log(rate);
                      response.render('crm/rates/edit.ejs', {
                        user : request.user, // get the user out of session and pass to template
                        title : 'Edit Service Rate',
                        rate : rate
                      });
                  }
               
             });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/rates/edit/:id',
        callbackFunction : function(request, response) {
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
            vehicleServicesModel.vehicleServicesModel.updateServiceRateById(request.body.rate, request.params.id,
              function (status) {
                response.json(status);
             });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/rates/createRate',
        callbackFunction : function(request, response) {
           response.render('crm/rates/create.ejs', {
                user : request.user, // get the user out of session and pass to template
                title : 'Create Vehicle Service and Rate'            
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/rates/createRate',
        callbackFunction : function(request, response) {
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
            vehicleServicesModel.vehicleServicesModel.createVehicleServiceRate(request.body.vehicleServiceRate,
              function (err,status) {
                  if (err) {
                      response.json({error: err.code});
                  } else {
                      response.json({status : 'success'});
                  }
                
             });
        }

    });
    */
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/crm/login');
}

// route middleware to make sure a user is logged in
function hasPermission(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.user.role == 'staff' || req.user.role == 'admin') {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/crm/login');
}

module.exports = crmRouteConfig;