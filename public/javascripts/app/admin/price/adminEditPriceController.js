angular.module("adminPriceModule")
.controller("adminEditPriceController", adminEditPriceController)
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

adminEditPriceController.$inject = ['$scope','$timeout', '$window', 'adminPriceService'];

function adminEditPriceController($scope, $timeout, $window, adminPriceService) {
    
    $scope.updatePrice = function (priceId, price) {
      adminPriceService.updatePrice(priceId, price)
      .success(function (data) {
        if (data && data.status == 'success') {
          $scope.message = "Price updated successfully";
        }
      });
    };
    
}