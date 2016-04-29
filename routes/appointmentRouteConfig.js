var moment = require('moment');
function appointmentRouteConfig(app) { 

    this.app = app;
    this.routeTable = [];
    this.init();
}


appointmentRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();
	

}


appointmentRouteConfig.prototype.processRoutes = function () { 

    var self = this;

    self.routeTable.forEach(function (route) {
    
        if (route.requestType == 'get') {
            
            console.log(route);
            self.app.get(route.requestUrl, route.callbackFunction);
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


appointmentRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({
    
        requestType : 'get',
        requestUrl : '/appointment/createAppointment',
        callbackFunction : function (request, response) { 
            var user = [];
            if (request.isAuthenticated()) {
                user = request.user;
            }
            console.log(user);
            response.render('appointment/createAppointment', { title : "Appointment" , user : request.user, message : request.flash('message')});
        }
    });
    
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/appointment/createAppointment',
        callbackFunction : function (request, response) {
            var user = [];
            if (request.isAuthenticated()) {
                user = request.user;
            }
            console.log(user);
            response.render('appointment/createAppointment', { title : "Appointment" , user : request.user});
            
            /*
            var productCategoryModel = require('../server/model/productCategoryModel.js');
            
            
            console.log(request.body);
            
            productCategoryModel.productCategoryModel.createProductCategory(request.body, 
                function (status) { 
            
                response.json(status); 

                console.log(status);
            });*/
            
        }
    });


    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/viewAppointment',
        callbackFunction : function (request, response) {
            
            response.render('appointment/viewAppointment', { title : "Schedule Your Appoinments" , user : request.user });
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/getAllAppointments',
        callbackFunction : function (request, response) {
            //var slots = [];
            //var appointments = [];

            var appointmentSlotsModel = require('../server/model/appointmentSlotsModel.js');
            appointmentSlotsModel.appointmentSlotsModel.getAllAppointmentSlots (
                function (slots) {
                    console.log(slots);
                    response.json({ slots : slots });
                    /*response.render('appointment/showAllAppointments', 
                        { title : "Schedule Your Appoinment" , 
                        slots : slots, 
                        user : request.user});
            */
            });


            /*
            var productCategoryModel = require('../server/model/productCategoryModel.js');
            productCategoryModel.productCategoryModel.getAllProductCategory (
                function (productCategories) {
                    console.log(productCategories);
                    response.json({ productCategories : productCategories });
            });
            */
            //response.render('showAppointment', { title : "Schedule Your Appoinment" , appointments : appointments, user : request.user});
        }
    });


    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/editAppointment/:appointmentId',
        callbackFunction : function (request, response) {
            
            response.render('editAppointment', { title : "Edit Appointment" });
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/scheduleAppointmentStep1',
        callbackFunction : function (request, response) {
            
            response.render('appointment/scheduleAppointmentStep1', { title : "Schedule Appointment", user : request.user });
        }
    });

    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/appointment/scheduleAppointmentStep2',
        callbackFunction : function (request, response) {
            console.log("scheduleAppointmentStep1 params below");
            console.log(request.params);
            
            response.render('appointment/scheduleAppointmentStep2', { title : "Schedule Appointment", user : request.user, appointment: request.params.appointment });
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/scheduleAppointment',
        callbackFunction : function (request, response) {

            response.render('appointment/scheduleAppointment', { title : "Schedule Appointment", user : request.user });
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/scheduleStep1',
        callbackFunction : function (request, response) {
            //console.log("scheduleAppointmentStep1 params below");
            //console.log(request.params);
            
            response.render('appointment/scheduleStep1', {user: request.user} );
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/scheduleStep2',
        callbackFunction : function (request, response) {
            //console.log("scheduleAppointmentStep1 params below");
            //console.log(request.params);
            
            response.render('appointment/scheduleStep2', {user: request.user} );
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/scheduleStep3',
        callbackFunction : function (request, response) {
            //console.log("scheduleAppointmentStep1 params below");
            //console.log(request.params);
            
            response.render('appointment/scheduleStep3', {user: request.user} );
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/scheduleStep4',
        callbackFunction : function (request, response) {
            //console.log("scheduleAppointmentStep1 params below");
            //console.log(request.params);
            console.log(request.user);
            if (request.user) {
                console.log("im logged in");
            }
            response.render('appointment/scheduleStep4', {user: request.user} );
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/scheduleStep5',
        callbackFunction : function (request, response) {
            //console.log("scheduleAppointmentStep1 params below");
            //console.log(request.params);
            console.log(request.user);
            if (request.user) {
                console.log("im logged in");
            }
            response.render('appointment/scheduleStep5', {user: request.user} );
        }
    });

    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/appointment/schedule',
        callbackFunction : function (request, response) {
            var data = request.body;

            console.log('appointment data velow');
            console.log(data.appointment);

            var appointmentModel = require('../server/model/appointmentModel.js');
            var customerModel = require('../server/model/customerModel.js');
            var appointmentServicesModel = require('../server/model/appointmentServicesModel.js');

            if (request.user) {
                //if user found, save the user_id to the appointment
                data.appointment.user_id = request.user.id;
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
            } else {
                //otherwise, create customer info
                
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
            
        }
    });

    //createOwnerInformation
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/appointment/createOwnerInformation',
        callbackFunction : function (request, response) {
            if (request.user) {
                response.json({user_id : request.user.id});
            } else {
            console.log(request.body);
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.createOwnerInformation (request.body,
                function (data) {
                    console.log(data);
                    response.json({ customer_id : data.insertId });
                }); 
            }
        }
    });

    //createServices
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/appointment/createAppointmentServices',
        callbackFunction : function (request, response) {
            var services = request.body.services;
            var appointment_id = request.body.appointment_id;

            console.log(request.body);
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.createAppointmentServices (services, appointment_id,
                function (data) {
                    console.log(data);
                    response.json(data);
                }); 
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/getAvailableAppointmentDates',
        callbackFunction : function (request, response) {
            //var slots = [];
            //var appointments = [];
            var appointmentSlotsModel = require('../server/model/appointmentSlotsModel.js');
            appointmentSlotsModel.appointmentSlotsModel.getAvailableAppointmentDates (
                function (available_dates) {
                    console.log(available_dates);
                    response.json({ available_dates : available_dates });
            }); 
        }
    });
	
    self.routeTable.push({   
        requestType : 'get',
        requestUrl : '/appointment/confirmation/:id',
        callbackFunction : function (request, response) {
			
            console.log(request.params.id);
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.getAppointment (request.params.id,
                function (data) {
                    console.log(data);
                    response.render('appointment/confirmation', {title: 'Confirmation', user: request.user, appointment : data, moment : moment, appointment_id : request.params.id});
                }); 
            
        }
    });
	
    self.routeTable.push({   
        requestType : 'post',
        requestUrl : '/appointment/cancelAppointment',
        callbackFunction : function (request, response) {
			
            console.log(request.body.id);
            var appointmentModel = require('../server/model/appointmentModel.js');
            appointmentModel.appointmentModel.cancelAppointment (request.body.id,
                function (data) {
                    console.log(data);
					response.json(data);
                }); 
            
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/getAvailableTimeSlotsForDate/:date',
        callbackFunction : function (request, response) {

            var appointmentSlotsModel = require('../server/model/appointmentSlotsModel.js');
            appointmentSlotsModel.appointmentSlotsModel.getAvailableTimeSlotsForDate (request.params.date,
                function (time_slots) {
                    console.log(time_slots);
                    response.json({ time_slots : time_slots });
            });

        }
    });

    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/appointment/updateAppointment',
        callbackFunction : function (request, response) {
            /*
            console.log(request.body.categoryName);

            var productCategoryModel = require('../server/model/productCategoryModel.js');
            productCategoryModel.productCategoryModel.updateProductCategory(request.body.categoryName, request.body.details, request.body.productCategoryId,
                function (status) {
                console.log(status);
                response.json(status);
            });*/
        }
    });


    self.routeTable.push({
        
        requestType : 'delete',
        requestUrl : '/appointment/cancelAppointment/:appointmentId',
        callbackFunction : function (request, response) {
            /*
            console.log(request.params.productCategoryId);
            
            var productCategoryModel = require('../server/model/productCategoryModel.js');
            productCategoryModel.productCategoryModel.deleteProductCategoryById(request.params.productCategoryId,
                function (status) {
                console.log(status);
                response.json(status);
            });*/
        }

    });


    //getOwnerInformation
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/appointment/getOwnerInformation',
        callbackFunction : function (request, response) {
            console.log(request.params);
            response.render('appointment/editOwnerInfo.ejs', { 
                title : "Edit Owner Information", 
                user : request.user, 
                appointment : request.params.appointment});
            /*
            console.log(request.params.productCategoryId);
            
            var productCategoryModel = require('../server/model/productCategoryModel.js');
            productCategoryModel.productCategoryModel.deleteProductCategoryById(request.params.productCategoryId,
                function (status) {
                console.log(status);
                response.json(status);
            });*/
        }

    });
    
    

}

module.exports = appointmentRouteConfig;