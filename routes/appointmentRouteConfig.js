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
        
            response.render('appointment/createAppointment', { title : "Appointment" });
        }
    });
    
    
    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/appointment/createAppointment',
        callbackFunction : function (request, response) {
            
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
        requestUrl : '/appointment/viewAppointment/:userId',
        callbackFunction : function (request, response) {
            
            response.render('viewAppointment', { title : "View Your Appoinments" });
        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/appointment/getAllAppointments',
        callbackFunction : function (request, response) {
            /*
            var productCategoryModel = require('../server/model/productCategoryModel.js');
            productCategoryModel.productCategoryModel.getAllProductCategory (
                function (productCategories) {
                    console.log(productCategories);
                    response.json({ productCategories : productCategories });
            });
            */
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