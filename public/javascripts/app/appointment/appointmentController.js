angular.module("appointmentModule")
.controller("appointmentController", appointmentController);

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