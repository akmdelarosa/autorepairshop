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
  
  getVehiclesList();

  function getVehiclesList() {
    adminVehicleService.getVehiclesList()
    .success(function (data) {
      if (data) {
        $scope.vehicles = data;
        createTable(data);
      }
    });
  }

  function createTable(data) {

    $scope.tableParams = new NgTableParams(
      {count: 10}, 
      { counts: [], 
        getData: function($defer, params) {
          var filteredData = params.filter() ?
                  $filter('filter')(data, params.filter()) :
                     data;
          var orderedData = params.sorting() ?
                  $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
          $scope.tableParams.total(data.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    
    $scope.markDeleted = function (id) {
      adminVehicleService.markDeleted(id)
      .success(function (data) {
        if (data) {
          $scope.message = "Vehicle removed successfully";
          $timeout( function afterTimeOut() {
              $window.location.href ='/admin/vehicles/index'; 
            }, 1000);
        }
      });
    };

  }
  
    

}