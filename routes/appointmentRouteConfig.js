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
        requestUrl : '/appointment/scheduleAppointment',
        callbackFunction : function (request, response) {
            
            response.render('appointment/scheduleAppointment', { title : "Schedule Appointment", user : request.user });
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



    
    

}

module.exports = appointmentRouteConfig;