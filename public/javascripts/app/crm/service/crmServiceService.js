angular.module("crmServiceModule")
.factory("crmServiceService", crmServiceService);

crmServiceService.$inject = ['$http'];

function crmServiceService($http) {
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
		startService: function(id,mileage_read,vin) {
		  return $http.post('/crm/services/start',
			{
				id : id,
				mileage_read : mileage_read,
				vin : vin
			});
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
		schedule: function(appointment) {
			return $http.post('/crm/appointments/schedule', {appointment: appointment});
		},
		getServicesByDate: function(date) {
			return $http.get('/crm/getServicesByDate/'+date);
		},
		getAllRepairStatus: function() {
			return $http.get('/crm/getAllRepairStatus');
		},
		updateStatus: function(id,status_id) {
			return $http.post('/crm/services/updateStatus', {id: id, status_id : status_id});
		},
		markCompleted: function(id) {
			return $http.post('/crm/services/markCompleted', {id: id});
		}
  };
}
