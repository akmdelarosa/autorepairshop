angular.module("serviceModule")
.controller("serviceController", serviceController);

serviceController.$inject = ['$scope','$timeout', 'serviceService'];

function serviceController($scope, $timeout, serviceService) {
	$scope.services = {};
	getAvailableServices();
  
  function getAvailableServices() {
    serviceService.getAvailableServices()
    .success(function (data) {
		console.log(data);
      if (data && data.services && data.services.length > 0) {
        $scope.services = data.services;
      }
    });
  }
  
}