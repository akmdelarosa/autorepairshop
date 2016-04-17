var profileModule = angular.module("profileModule");

profileModule.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
});

profileModule.controller("profileController", profileController);
profileModule.directive('input', function ($parse) {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function (scope, element, attrs) {
      if (attrs.ngModel && attrs.value) {
        $parse(attrs.ngModel).assign(scope, attrs.value);
      }
    }
  };
});

profileController.$inject = ['$scope','$timeout', 'profileService'];

function profileController($scope, $timeout, profileService) {
	
	getVehicles();
	getAppointments();
	getServiceHistory();
  
  $scope.editProfile = function (user) {
    profileService.editProfile(user)
    .success(function (data) {
      if (data.status && data.status == 'successful') {
        $scope.message = 'Profile updated successfully';
      }
    });
  };
  
  function getVehicles() {
  	profileService.getVehicles()
	  .success(function (data) {
	      if (data && data.vehicles.length > 0) {
	        $scope.vehicles = data.vehicles;
	      }
	  }) ;
  };
  
  function getAppointments() {
  	profileService.getAppointments()
	  .success(function (data) {
	      if (data && data.appointments.length > 0) {
	        $scope.appointments = data.appointments;
	      }
	  }) ;
  };
  
  function getServiceHistory() {
  	profileService.getServiceHistory()
	  .success(function (data) {
	      if (data && data.services.length > 0) {
	        $scope.services = data.services;
	      }
	  }) ;
  };
}