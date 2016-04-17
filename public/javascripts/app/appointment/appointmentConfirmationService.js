angular.module("appointmentConfirmationModule")
.factory("appointmentConfirmationService", appointmentConfirmationService);

appointmentConfirmationService.$inject = ['$http'];

function appointmentConfirmationService($http) {
  return {
	cancelAppointment: function(id) {
	  return $http.post('/appointment/cancelAppointment',{id : id});
	}
  };
}
