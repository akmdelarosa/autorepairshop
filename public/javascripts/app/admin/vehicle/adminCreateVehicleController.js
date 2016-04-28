angular.module("adminVehicleModule")
.controller("adminCreateVehicleController", adminCreateVehicleController)
.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
})
.directive('input', function ($parse) {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function (scope, element, attrs) {
      if (attrs.ngModel && attrs.value) {
        $parse(attrs.ngModel).assign(scope, attrs.value);
      }
    }
  };
})
.directive('textarea', function ($parse) {
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

adminCreateVehicleController.$inject = ['$scope','$timeout', '$window', 'adminVehicleService'];

function adminCreateVehicleController($scope, $timeout, $window, adminVehicleService) {
    
    $scope.createVehicle = function (vehicle) {
    adminVehicleService.createVehicle(vehicle)
    .success(function (data) {
      console.log(data);
      if (data.status) {
        console.log(data);
         $scope.message = "Vehicle added successfully";
         $timeout( function afterTimeOut() {
             $window.location.href ='/admin/vehicles/index'; 
          }, 5000);
      } else if (data.error) {
        $scope.error = "An error was encountered while processing your request. Error code: " + data.error;
      }
    });
  };
    
}