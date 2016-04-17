function estimatorToolRouteConfig(app) { 

    this.app = app;
    this.routeTable = [];
    this.init();
}


estimatorToolRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


estimatorToolRouteConfig.prototype.processRoutes = function () { 

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


estimatorToolRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({
    
        requestType : 'get',
        requestUrl : '/estimate/index',
        callbackFunction : function (request, response) { 
        
            response.render('estimate/index', { title : "Estimator Tool", user : request.user });
        }
    });
    
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/estimate/result',
        callbackFunction : function (request, response) {
            
            response.render('estimate/result', { title : "Results", user : request.user })
        }
    });
	
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/estimate/getPricesAndRates/:year/:make/:model/:serviceId',
        callbackFunction : function (request, response) {
            console.log(request.params);
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
            vehicleServicesModel.vehicleServicesModel.getPricesAndRates(
				request.params.year,
				request.params.make,
				request.params.model,
				request.params.serviceId,
                function (status) {
                console.log(status);
                response.json({results : status});
            });
        }
    });
	
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/estimate/getPartsByVehicleAndService/:year/:make/:model/:serviceId',
        callbackFunction : function (request, response) {
			console.log(request.params);
            
            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
            vehicleServicesModel.vehicleServicesModel.getPartsByVehicleAndService(
				request.params.year,
				request.params.make,
				request.params.model,
				request.params.serviceId,
                function (status) {
                console.log(status);
                response.json({parts : status});
            });
        }
    });

}

module.exports = estimatorToolRouteConfig;