angular.module("adminRateModule")
.factory("adminRateService", adminRateService);

adminRateService.$inject = ['$http'];

function adminRateService($http) {
  return {
		updateRate: function (id, rate) {
      return $http.post('/admin/rates/edit/'+id,
        {
            rate: {
                min_rate: rate.min_rate,
                max_rate: rate.max_rate
            }
        }
       );
    },
    createRate : function (vehicleServiceRate) {
      return $http.post('/admin/rates/createRate', {
        vehicleServiceRate: {
          year: vehicleServiceRate.year,
          make: vehicleServiceRate.make,
          model: vehicleServiceRate.model,
          service_id: vehicleServiceRate.service.id,
          min_rate: vehicleServiceRate.min_rate,
          max_rate: vehicleServiceRate.max_rate
        }
      });
    },
    getAllServicesRates : function () {
      return $http.get('/admin/rates/getAllServicesRates');
    },
    getAllMakesByYear: function (year) {
      console.log('year in service below');
      console.log(year);
      return $http.get('/vehicle/getAllMakesByYear/'+ year);
    },

    getYears: function() {
      return $http.get('/vehicle/getYears');
    },

    getAllModelsByYearAndMake: function(year, model) {
      return $http.get('/vehicle/getAllModelsByYearAndMake/'+year+'/'+model);
    },

    getAvailableServices: function() {
      return $http.get('/vehicle/getAvailableServices');
    }
  };
}
