angular.module("appointmentModule")
.controller("viewAppointmentController", viewAppointmentController);

viewAppointmentController.$inject = ['$scope', '$timeout', 'appointmentService'];

function viewAppointmentController($scope, $timeout, appointmentService) {
  $scope.slots = [];

  getAllAppointmentSlots();

  function getAllAppointmentSlots() {
    appointmentService.getAllAppointmentSlots()
    .success(function (data) {
      if (data && data.slots && data.slots.length > 0) {
        $scope.slots = data.slots;
      }
    });
  }
}