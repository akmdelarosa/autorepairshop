angular.module("crmAppointmentModule")
.controller("crmEditAppointmentController", crmEditAppointmentController)
.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
})
.filter('time', function() {
    return function(input) {
        return moment(input,'LT').format('LT');
    }
});

crmEditAppointmentController.$inject = ['$scope','$timeout', 'crmAppointmentService'];

function crmEditAppointmentController($scope, $timeout, crmAppointmentService) {
    console.log("ye");
    
    $scope.cancelAppointment = function (id) {
    crmAppointmentService.cancelAppointment(id)
    .success(function (data) {
      if (data) {
         $scope.message = "Appointment cancelled successfully";
      }
    });
  };
    
}