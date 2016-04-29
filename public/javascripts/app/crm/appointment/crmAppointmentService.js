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
	  	return $http.post('/crm/cancelAppointment',{id : id});
		}
		,
		startService: function(id) {
		  return $http.post('/crm/appointment/startService',{id : id});
		}
		,
		getAllAvailableAppointmentSlots: function() {
			return $http.get('/crm/getAllAvailableAppointmentSlots');
		}
		,
		getVehiclesList: function() {
			return $http.get('/crm/getVehiclesList');
		},
		getAvailableServices: function() {
      return $http.get('/vehicle/getAvailableServices');
    },
  };
}
