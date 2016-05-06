angular.module("adminServiceModule")
.controller("adminRemoveServiceController", adminRemoveServiceController)
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

adminRemoveServiceController.$inject = ['$scope','$timeout', '$window', 'adminServiceService'];

function adminRemoveServiceController($scope, $timeout, $window, adminServiceService) {
    
    $scope.markDeleted = function (id) {
    adminServiceService.markDeleted(id)
    .success(function (data) {
      if (data) {
         $scope.message = "Service removed successfully";
         $timeout( function afterTimeOut() {
             $window.location.href ='/admin/services/index'; 
          }, 5000);
      }
    });
  };
    
}