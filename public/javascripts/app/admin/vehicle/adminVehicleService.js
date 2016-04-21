angular.module("adminVehicleModule")
.factory("adminVehicleService", adminVehicleService);

adminVehicleService.$inject = ['$http'];

function adminVehicleService($http) {
  return {
		updateVehicle: function (id, vehicle) {
      return $http.post('/admin/vehicles/edit/'+id,
        {
            vehicle: {
                year: vehicle.year,
                make: vehicle.make,
                model: vehicle.model
            }
        }
       );
    },
    createVehicle : function (vehicle) {
      return $http.post('/admin/vehicles/createVehicle', {vehicle : vehicle});
    },
    getVehiclesList : function () {
      return $http.get('/admin/vehicles/getVehiclesList');
    }
  };
}
