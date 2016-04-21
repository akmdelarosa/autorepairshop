angular.module("adminVehicleModule")
.controller("adminViewVehicleController", adminViewVehicleController)
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

adminViewVehicleController.$inject = ['$scope','$timeout', '$window', '$filter', 'NgTableParams', 'adminVehicleService'];

function adminViewVehicleController($scope, $timeout, $window, $filter, NgTableParams, adminVehicleService) {
  
    $scope.tableParams = new NgTableParams(
      {count: 10}, 
      { counts: [], 
        getData: function($defer, params) {
          adminVehicleService.getVehiclesList()
          .success(function (data) {
            if (data) {
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
    }});

}