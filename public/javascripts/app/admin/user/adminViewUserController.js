angular.module("adminUserModule")
.controller("adminViewUserController", adminViewUserController)
.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
});

adminViewUserController.$inject = ['$scope','$timeout', '$filter', '$window', 'NgTableParams', 'adminUserService'];

function adminViewUserController($scope, $timeout, $filter, $window, NgTableParams, adminUserService) {
    
    $scope.tableParams = new NgTableParams(
      {count: 10}, 
      { counts: [], 
        getData: function($defer, params) {
          adminUserService.getAllUsers()
          .success(function(data){
            if (data && data.users && data.users.length > 0 ) {
                console.log(data.users);
              var filteredData = params.filter() ?
                      $filter('filter')(data.users, params.filter()) :
                         data.users;
              var orderedData = params.sorting() ?
                      $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
              $scope.tableParams.total(data.users.length);
              $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
          });
        }});
    $scope.markDeleted = function (id) {
      adminUserService.markDeleted(id)
      .success(function (data) {
        if (data) {
          $scope.message = "User removed successfully";
          $timeout( function afterTimeOut() {
              $window.location.href ='/admin/users/index'; 
            }, 1000);
        }
      });
    };
}