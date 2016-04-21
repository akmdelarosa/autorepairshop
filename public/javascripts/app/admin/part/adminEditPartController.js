angular.module("adminPartModule")
.controller("adminEditPartController", adminEditPartController)
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

adminEditPartController.$inject = ['$scope','$timeout', '$window', 'adminPartService'];

function adminEditPartController($scope, $timeout, $window, adminPartService) {
    
    $scope.updatePart = function (partId, part) {
      adminPartService.updatePart(partId, part)
      .success(function (data) {
        if (data) {
          $scope.message = "Part updated successfully";
        }
      });
    };
    
}