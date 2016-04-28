angular.module("adminPriceModule")
.controller("adminViewPriceController", adminViewPriceController)
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

adminViewPriceController.$inject = ['$scope','$timeout', '$window', '$filter', 'NgTableParams', 'adminPriceService'];

function adminViewPriceController($scope, $timeout, $window, $filter, NgTableParams, adminPriceService) {
  
  getAllPartsPrices();
  
  function getAllPartsPrices() {
    adminPriceService.getAllPartsPrices()
    .success(function (data) {
      if (data) {
        $scope.prices = data;
        createTable(data);
      }
    });
  }
  
  function createTable(data) {
    $scope.tableParams = new NgTableParams(
      {count: 10}, 
      { counts: [], 
        getData: function($defer, params) {
          console.log(data);
          var filteredData = params.filter() ?
                  $filter('filter')(data, params.filter()) :
                      data;
          var orderedData = params.sorting() ?
                  $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
          $scope.tableParams.total(data.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });    
  }

}