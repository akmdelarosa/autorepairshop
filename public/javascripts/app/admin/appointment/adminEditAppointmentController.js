angular.module("adminAppointmentModule")
.controller("adminEditAppointmentController", adminEditAppointmentController)
.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
});

adminEditAppointmentController.$inject = ['$scope','$timeout', 'adminAppointmentService'];

function adminEditAppointmentController($scope, $timeout, adminAppointmentService) {
    console.log("ye");
    
    $scope.cancelAppointment = function (id) {
    adminAppointmentService.cancelAppointment(id)
    .success(function (data) {
      if (data) {
         $scope.message = "Appointment cancelled successfully";
      }
    });
  };
    
}