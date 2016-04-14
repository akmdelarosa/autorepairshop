angular.module("serviceModule")
.factory("serviceService", serviceService);

serviceService.$inject = ['$http'];

function serviceService($http) {
  return {
    getAvailableServices: function() {
      return $http.get('/vehicle/getAvailableServices');
    }
  };
}
