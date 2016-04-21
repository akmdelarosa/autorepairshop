angular.module("adminProfileModule")
.controller("editAdminProfileController", editAdminProfileController)
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

editAdminProfileController.$inject = ['$scope','$timeout', 'adminProfileService'];

function editAdminProfileController($scope, $timeout, adminProfileService) {
    
    $scope.editProfile = function (userId, user) {
    adminProfileService.updateUser(userId, user)
    .success(function (data) {
      if (data) {
         $scope.message = "Profile updated successfully";
      }
    });
  };
    
}