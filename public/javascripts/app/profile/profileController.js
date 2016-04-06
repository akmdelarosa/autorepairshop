var profileModule = angular.module("profileModule");

profileModule.controller("profileController", profileController);
profileModule.directive('input', function ($parse) {
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

profileController.$inject = ['$scope','$timeout', 'profileService'];

function profileController($scope, $timeout, profileService) {
  
  $scope.editProfile = function (user) {
    profileService.editProfile(user)
    .success(function (data) {
      if (data.status && data.status == 'successful') {
        $scope.message = 'Profile updated successfully';
      }
    });
  };
}