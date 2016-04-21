angular.module("adminServiceModule")
.controller("adminEditServiceController", adminEditServiceController)
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

adminEditServiceController.$inject = ['$scope','$timeout', '$window', 'adminServiceService'];

function adminEditServiceController($scope, $timeout, $window, adminServiceService) {
    
    $scope.updateService = function (serviceId, service) {
      adminServiceService.updateService(serviceId, service)
      .success(function (data) {
        if (data) {
          $scope.message = "Service updated successfully";
        }
      });
    };
  
  $scope.removeServicePart = function (servicePartId) {
    adminServiceService.removeServicePart(servicePartId)
    .success(function (data) {
      if (data) {
        $scope.message = "Part removed successfully";
        $timeout( function afterTimeOut() {
            $window.location.reload();
        }, 5000);
      }
    });
  };
    
}