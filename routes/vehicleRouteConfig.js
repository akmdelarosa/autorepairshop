function vehicleRouteConfig(app) { 

    this.app = app;
    this.routeTable = [];
    this.init();
}


vehicleRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


vehicleRouteConfig.prototype.processRoutes = function () { 

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


vehicleRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/vehicle/getAllVehicle',
        callbackFunction : function (request, response) {

            var vehicleModel = require('../server/model/vehicleModel.js');
            vehicleModel.vehicleModel.getAllVehicle (
                function (list) {
                    console.log(list);
                    response.json({ vehicleList : list });
            });

        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/vehicle/getAllMakesByYear/:year',
        callbackFunction : function (request, response) {
            //var slots = [];
            //var vehicles = [];
            console.log('request');
            console.log(request.params);
            var vehicleModel = require('../server/model/vehicleModel.js');
            vehicleModel.vehicleModel.getAllMakesByYear (request.params.year,
                function (makes) {
                    console.log(makes);
                    response.json({ makes : makes });
                    /*response.render('vehicle/showAllAppointments', 
                        { title : "Schedule Your Appoinment" , 
                        slots : slots, 
                        user : request.user});
            */
            });

        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/vehicle/getYears',
        callbackFunction : function (request, response) {
            //var slots = [];
            //var vehicles = [];
            console.log('request');
            console.log(request.params);
            var vehicleModel = require('../server/model/vehicleModel.js');
            vehicleModel.vehicleModel.getYears (
                function (years) {
                    console.log(years);
                    response.json({ years : years });
                    /*response.render('vehicle/showAllAppointments', 
                        { title : "Schedule Your Appoinment" , 
                        slots : slots, 
                        user : request.user});
            */
            });

        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/vehicle/getAllModelsByYearAndMake/:year/:make',
        callbackFunction : function (request, response) {
            //var slots = [];
            //var vehicles = [];
            console.log('request');
            console.log(request.params);
            var vehicleModel = require('../server/model/vehicleModel.js');
            vehicleModel.vehicleModel.getAllModelsByYearAndMake (request.params.year, request.params.make,
                function (models) {
                    console.log(models);
                    response.json({ models : models });
                    /*response.render('vehicle/showAllAppointments', 
                        { title : "Schedule Your Appoinment" , 
                        slots : slots, 
                        user : request.user});
            */
            });

        }
    });

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/vehicle/getAvailableServices',
        callbackFunction : function (request, response) {
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
            vehicleServicesModel.vehicleServicesModel.getAvailableServices (
                function (services) {
                    response.json({ services : services });
            });

        }
    });
    
    

}

module.exports = vehicleRouteConfig;