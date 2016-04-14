function serviceRouteConfig(app) { 

    this.app = app;
    this.routeTable = [];
    this.init();
}


serviceRouteConfig.prototype.init = function () { 

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


serviceRouteConfig.prototype.processRoutes = function () { 

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


serviceRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/viewServices',
        callbackFunction : function (request, response) {

            var vehicleServicesModel = require('../server/model/vehicleServicesModel.js');
            vehicleServicesModel.vehicleServicesModel.getAvailableServices (
                function (list) {
                    console.log(list);
                    response.render('service/index', {title : 'Services Offered', user : request.user});
            });

        }
    });
     
}

module.exports = serviceRouteConfig;