angular.module("adminAppointmentModule")
.factory("adminAppointmentService", adminAppointmentService);

adminAppointmentService.$inject = ['$http'];

function adminAppointmentService($http) {
  return {
		getAllAppointments: function() {
			return $http.get('/admin/viewAllAppointments');
		},
		getAllAppointmentsServices: function() {
			return $http.get('/admin/getAllAppointmentsServices');
		},
		cancelAppointment: function(id) {
	  	return $http.post('/appointment/cancelAppointment',{id : id});
		}
  };
}
