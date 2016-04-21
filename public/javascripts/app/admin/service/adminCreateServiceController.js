angular.module("adminServiceModule")
.controller("adminCreateServiceController", adminCreateServiceController)
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

adminCreateServiceController.$inject = ['$scope','$timeout', '$window', 'adminServiceService'];

function adminCreateServiceController($scope, $timeout, $window, adminServiceService) {
    
    $scope.createService = function (service) {
    adminServiceService.createService(service)
    .success(function (data) {
      if (data) {
         $scope.message = "Service added successfully";
         $timeout( function afterTimeOut() {
             $window.location.href ='/admin/services/index'; 
          }, 5000);
      }
    });
  };
    
}