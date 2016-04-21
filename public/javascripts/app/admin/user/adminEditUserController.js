angular.module("adminUserModule")
.controller("adminEditUserController", adminEditUserController)
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
});

adminEditUserController.$inject = ['$scope','$timeout', 'adminUserService'];

function adminEditUserController($scope, $timeout, adminUserService) {
    console.log("ye");
    
    $scope.updateUser = function (userId, userProfile) {
    adminUserService.updateUser(userId, userProfile)
    .success(function (data) {
      if (data) {
         $scope.message = "User updated successfully";
      }
    });
  };
  
  $scope.removeVehicle = function (userId, vehicleId) {
    adminUserService.deleteUserVehicle(userId,vehicleId)
    .success(function (data) {
      if (data) {
         $scope.message = "User vehicle removed successfully";
      }
    });
  };
    
}