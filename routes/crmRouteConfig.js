var staffUserModel = require('../server/model/staffUserModel.js');
var moment = require('moment');
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
        requestUrl : '/crm/profile',
        callbackFunction : function(request, response) {
            response.redirect('/crm/profile/index');
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
        callbackFunction : function(request, response, next) {
            console.log('date: ' + request.params.date); 
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.getAvailableAppointmentsByDate(request.params.date,
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
        callbackFunction : function(request, response, next) {
            var appointmentModel = require('../server/model/appointmentModel.js');
            console.log('date: ' + request.params.date); 
            appointmentModel.appointmentModel.getAvailableAppointmentsServicesByDate(request.params.date,
                function (err,status) {
                    
                    if (err) {
                        response.json({error : err.code});
                    } else {
                        response.json({services : status});
                    }
            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/appointments',
        callbackFunction : function(request, response) {
            response.redirect('/crm/appointments/today');
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/appointments/today',
        callbackFunction : function(request, response) {
            response.render('crm/appointments/today.ejs', {
                user : request.user, // get the user out of session and pass to template
                title: 'Scheduled Appointments for Today'
                }); 
        }
    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/appointments/schedule',
        callbackFunction : function(request, response) {
            response.render('crm/appointments/schedule.ejs', {
                user : request.user, // get the user out of session and pass to template
                title: 'Schedule Appointment'
                }); 
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/profile/edit',
        callbackFunction : function(request, response, next) {
            
            var userModel = require('../server/model/userModel.js');
            userModel.userModel.updateUser(request.body.user, request.body.user.id,
                function (status) { 
                    response.json(status); 

            });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/cancelAppointment',
        callbackFunction : function(request, response, next) {
            
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.cancelAppointment(request.body.id,
                function (status) { 
                    response.json({status : 'success'});

            });
        }

    });
    //getAllAvailableAppointmentSlots
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/getAllAvailableAppointmentSlots',
        callbackFunction : function(request, response, next) {
            
            var appointmentSlotsModel = require('../server/model/appointmentSlotsModel.js');
            appointmentSlotsModel.appointmentSlotsModel.getAllAvailableAppointmentSlots(
                function (err,status) { 
                    if (err) {
                        response.json({error : err.code});
                    } else {
                        response.json({slots : status});
                    }
            });
        }

    });
    //getVehiclesList
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/getVehiclesList',
        callbackFunction : function(request, response, next) {
           var vehicleModel = require('../server/model/vehicleModel.js');
           vehicleModel.vehicleModel.getAllVehicles(
           function (err,vehicles) {
               if (err) {
                    response.json({error : err.code});
                } else {
                    response.json({list : vehicles});
                }
           });
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/appointments/schedule',
        callbackFunction : function (request, response, next) {
            var data = request.body;

            console.log('appointment data velow');
            console.log(data.appointment);

            var appointmentModel = require('../server/model/appointmentModel.js');
            var customerModel = require('../server/model/customerModel.js');
            var appointmentServicesModel = require('../server/model/appointmentServicesModel.js');

            customerModel.customerModel.createCustomer(
                {
                    first_name : data.appointment.first_name,
                    last_name : data.appointment.last_name,
                    email : data.appointment.email,
                    phone_number : data.appointment.phone_number
                }, function(customerStatus) {
                    console.log("createCustomer data below");
                    console.log(customerStatus);

                    data.appointment.customer_id = customerStatus.insertId;
                    console.log("appointment passed to createAppointment");
                    console.log(data.appointment);
                    appointmentModel.appointmentModel.createAppointment(data.appointment,
                        function (appointmentStatus) {
                            console.log("createappointment status below");
                            console.log(appointmentStatus);
                            //appointment_id = status.insertId;
                            data.appointment.appointment_id = appointmentStatus.insertId;
                            appointmentServicesModel.appointmentServicesModel.createAppointmentServices(data.appointment.services, appointmentStatus.insertId,
                                function(serviceStatus) {
                                    response.json({status: 'success', appointment_id : data.appointment.appointment_id});
                                    //response.redirect('/appointment/confirmation/'+data.appointment.appointment_id);
                            });
                    });

            });            
        }
    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/services/start/:id',
        callbackFunction : function(request, response, next) {
           
            var appointmentModel = require('../server/model/appointmentModel.js');
                        
            appointmentModel.appointmentModel.getAppointmentDataForServiceById(request.params.id,
                function (status) { 
                    response.render('crm/services/start.ejs', {
                    user : request.user, // get the user out of session and pass to template
                    title: 'Start Service',
                    appointment: status,
                    moment: moment
                    }); 
                });
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/services/start',
        callbackFunction : function(request, response, next) {
           
            var servicedVehicleModel = require('../server/model/servicedVehicleModel.js');
            var serviceHistoryModel = require('../server/model/serviceHistoryModel.js');
            console.log('post data',request.body);
            servicedVehicleModel.servicedVehicleModel.createServicedVehicleByAppointmentId(
                request.body.id, request.body.mileage_read, request.body.vin,
                function (vehicle_status) { 
                    serviceHistoryModel.serviceHistoryModel.createServiceHistory(request.body.id,
                    function (status) {
                        response.json({status: 'success'});
                    });
            });
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/services',
        callbackFunction : function(request, response, next) {
           
           response.redirect('/crm/services/today');
            
        }

    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/getServicesByDate/:date',
        callbackFunction : function(request, response, next) {
           
            var serviceHistoryModel = require('../server/model/serviceHistoryModel.js');
                        
            serviceHistoryModel.serviceHistoryModel.getServiceHistoryByDate(request.params.date,
                function (status) { 
                    response.json({services : status});
                });
        }
    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/services/today',
        callbackFunction : function(request, response) {

            response.render('crm/services/today.ejs', {
            user : request.user, // get the user out of session and pass to template
            title: 'Scheduled Services for Today',
            moment: moment
            });             
        }
    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/services/updateStatus',
        callbackFunction : function(request, response, next) {
           
            var serviceHistoryModel = require('../server/model/serviceHistoryModel.js');
                        
            serviceHistoryModel.serviceHistoryModel.updateStatus(request.body.id,request.body.status_id,
                function (err,status) {
                    if (err) { return next(err); } 
                    
                    response.json({status : 'success'});
            });
        }
    });
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/services/markCompleted',
        callbackFunction : function(request, response, next) {
           
            var serviceHistoryModel = require('../server/model/serviceHistoryModel.js');
                        
            serviceHistoryModel.serviceHistoryModel.markCompleted(request.body.id,
                function (err,status) {
                    if (err) { return next(err); } 
                    
                    response.json({status : 'success'});
            });
        }
    });
    //getAllRepairStatus
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/crm/getAllRepairStatus',
        callbackFunction : function(request, response, next) {
           
            var repairStatusModel = require('../server/model/repairStatusModel.js');
                        
            repairStatusModel.repairStatusModel.getAllRepairStatus(
                function (err,status) {
                    if (err) { console.error('err', err); return next(err); } 
                    
                    response.json({repair_status : status});

                    
            });
        }
    });
    
    
    //updateStatus
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/crm/services/updateStatus',
        callbackFunction : function(request, response, next) {
           
            var serviceHistoryModel = require('../server/model/serviceHistoryModel.js');
                        
            serviceHistoryModel.serviceHistoryModel.updateStatus(request.body.id, request.body.status,
                function (err,status) {
                    if (err) { console.error('err', err); return next(err); } else {
                        response.json(status);
                    }
                    
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