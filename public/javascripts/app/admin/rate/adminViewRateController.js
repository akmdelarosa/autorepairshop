angular.module("adminRateModule")
.controller("adminViewRateController", adminViewRateController)
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

adminViewRateController.$inject = ['$scope','$timeout', '$window', '$filter', 'NgTableParams', 'adminRateService'];

function adminViewRateController($scope, $timeout, $window, $filter, NgTableParams, adminRateService) {
  
  getAllServicesRates();
  
  function getAllServicesRates() {
    adminRateService.getAllServicesRates()
    .success(function (data) {
      if (data && !data.error) {
        $scope.rates = data;
        createTable(data);
      } else {
        $scope.error = "An error has occurred while processing your request. Error code : " + data.error;
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