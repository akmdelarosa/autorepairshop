angular.module("appointmentModule")
.controller("appointmentConfirmationController", appointmentConfirmationController);

appointmentModule.directive('input', function ($parse) {
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

appointmentConfirmationController.$inject = ['$scope','$timeout', 'appointmentService'];

function appointmentConfirmationController($scope, $timeout, appointmentService) {
  
  $scope.createAppointment = function (appointment) {
      console.log(appointment);
    appointmentService.createAppointment(appointment)
    .success(function (data) {
      if (data.status && data.status == 'successful') {
          displayMessage();
          $timeout( function afterTimeOut() {
              clearMessage();
              clearAppointment();
          }, 5000);
          
      }
    });
  }
}