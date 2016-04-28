angular.module("adminPartModule")
.controller("adminCreatePartController", adminCreatePartController)
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

adminCreatePartController.$inject = ['$scope','$timeout', '$window', 'adminPartService'];

function adminCreatePartController($scope, $timeout, $window, adminPartService) {
    
    $scope.createPart = function (part) {
    adminPartService.createPart(part)
    .success(function (data) {
      if (data) {
         $scope.message = "Part added successfully";
         $timeout( function afterTimeOut() {
             $window.location.href ='/admin/parts/index'; 
          }, 5000);
      }
    });
  };
    
}