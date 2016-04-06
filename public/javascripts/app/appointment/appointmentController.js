angular.module("appointmentModule")
.controller("appointmentController", appointmentController);

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

appointmentController.$inject = ['$scope','$timeout', 'appointmentService'];

function appointmentController($scope, $timeout, appointmentService) {
  $scope.appointment = {
    date : "",
    time : "",
    service : ""
  };

  function displayMessage() {
      $scope.message.containsSuccessfulMessage  = true;
      $scope.message.successfulMessage = 'Appointment added successfully';
  }
  
  function clearMessage() {
      $scope.message.containsSuccessfulMessage  = false;
      $scope.message.successfulMessage = "";
  }
  
  function clearAppointment() {
      $scope.appointment.date = "";
      $scope.appointment.time = "";
      $scope.appointment.service = "";
  }
  
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