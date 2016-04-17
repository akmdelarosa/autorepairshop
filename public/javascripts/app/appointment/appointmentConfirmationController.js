angular.module("appointmentConfirmationModule")
.controller("appointmentConfirmationController", appointmentConfirmationController);


appointmentConfirmationController.$inject = ['$scope','$timeout', 'appointmentConfirmationService'];

function appointmentConfirmationController($scope, $timeout, appointmentConfirmationService) {
	
    function displayMessage() {
        $scope.message = 'Appointment cancelled successfully.';
    }
  
    function clearMessage() {
        $scope.message = "";
    }
  
  $scope.createAppointment = function (appointment) {
      console.log(appointment);
    appointmentConfirmationService.createAppointment(appointment)
    .success(function (data) {
      if (data.status && data.status == 'successful') {
          displayMessage();
          $timeout( function afterTimeOut() {
              clearMessage();
          }, 5000);
          
      }
    });
  };
  
  $scope.cancelAppointment = function (id) {
    appointmentConfirmationService.cancelAppointment(id)
    .success(function (data) {
      if (data) {
          displayMessage();
      }
    });
  };
  
}