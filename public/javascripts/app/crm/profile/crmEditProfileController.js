angular.module("crmProfileModule")
.controller("crmEditProfileController", crmEditProfileController)
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

crmEditProfileController.$inject = ['$scope','$timeout', 'crmProfileService'];

function crmEditProfileController($scope, $timeout, crmProfileService) {
    
    $scope.editProfile = function (userId, user) {
    crmProfileService.updateUser(userId, user)
    .success(function (data) {
      if (data) {
         $scope.message = "Profile updated successfully";
      }
    });
  };
    
}