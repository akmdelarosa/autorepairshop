angular.module("crmAppointmentModule")
.factory("crmAppointmentService", crmAppointmentService);

crmAppointmentService.$inject = ['$http'];

function crmAppointmentService($http) {
  return {
		getAppointmentsByDate: function(date) {
			return $http.get('/crm/getAppointmentsByDate/'+date);
		},
		getAppointmentsServicesByDate: function(date) {
			return $http.get('/crm/getAppointmentsServicesByDate/'+date);
		},
		cancelAppointment: function(id) {
	  	return $http.post('/appointment/cancelAppointment',{id : id});
		}
  };
}
