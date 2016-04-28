angular.module("adminRateModule")
.controller("adminEditRateController", adminEditRateController)
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
})
.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});

adminEditRateController.$inject = ['$scope','$timeout', '$window', 'adminRateService'];

function adminEditRateController($scope, $timeout, $window, adminRateService) {
    
    $scope.updateRate = function (rateId, rate) {
      adminRateService.updateRate(rateId, rate)
      .success(function (data) {
        if (data && data.status == 'success') {
          $scope.message = "Rate updated successfully";
        } else {
          $scope.error = data.error;
        }
      });
    };
    
}