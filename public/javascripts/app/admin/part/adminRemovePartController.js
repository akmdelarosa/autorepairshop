angular.module("adminPartModule")
.controller("adminRemovePartController", adminRemovePartController)
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

adminRemovePartController.$inject = ['$scope','$timeout', '$window', 'adminPartService'];

function adminRemovePartController($scope, $timeout, $window, adminPartService) {
    
    $scope.markDeleted = function (id) {
    adminPartService.markDeleted(id)
    .success(function (data) {
      if (data) {
         $scope.message = "Part removed successfully";
         $timeout( function afterTimeOut() {
             $window.location.href ='/admin/parts/index'; 
          }, 000);
      }
    });
  };
    
}