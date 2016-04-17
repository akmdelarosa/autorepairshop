angular.module("estimatorToolModule")
.factory("estimatorToolService", estimatorToolService);

estimatorToolService.$inject = ['$http'];

function estimatorToolService($http) {
  return {
    
    getAllMakesByYear: function (year) {
      console.log('year in service below');
      console.log(year);
      return $http.get('/vehicle/getAllMakesByYear/'+ year);
    },

    getAllVehicle: function() {
      return $http.get('/vehicle/getAllVehicle');
    },

    getYears: function() {
      return $http.get('/vehicle/getYears');
    },

    getAllModelsByYearAndMake: function(year, model) {
      return $http.get('/vehicle/getAllModelsByYearAndMake/'+year+'/'+model);
    },

    getAvailableServices: function() {
      return $http.get('/vehicle/getAvailableServices');
    },
	
	getPricesAndRates: function(year,make,model,serviceId) {
	  return $http.get('/estimate/getPricesAndRates/'+year+'/'+make+'/'+model+'/'+serviceId);
	},
	
	getPartsByVehicleAndService: function(year,make,model,serviceId) {
	  return $http.get('/estimate/getPartsByVehicleAndService/'+year+'/'+make+'/'+model+'/'+serviceId);
	}
  };
}
