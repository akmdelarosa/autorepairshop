angular.module("appointmentModule")
.factory("appointmentService", appointmentService);

appointmentService.$inject = ['$http'];

function appointmentService($http) {
  return {
    getAllAppointmentSlots: function () {
      return $http.get('/appointment/getAllAppointments');
    },
    
    getAllMakesByYear: function (year) {
      console.log('year in service below');
      console.log(year);
      return $http.get('/vehicle/getAllMakesByYear/'+ year);
    },

    getAllVehicle: function() {
      return $http.get('/vehicle/getAllVehicle');
    },

    getYears: function() {
      return $http.get('/vehicle/getYears');
    },

    getAllModelsByYearAndMake: function(year, model) {
      return $http.get('/vehicle/getAllModelsByYearAndMake/'+year+'/'+model);
    },

    getAvailableAppointmentDates: function () {
      console.log("im called");
      return $http.get('/appointment/getAvailableAppointmentDates');
    },

    getAvailableTimeSlotsForDate: function (date) {
      return $http.get('/appointment/getAvailableTimeSlotsForDate/'+date);
    },

    getAvailableServices: function() {
      return $http.get('/vehicle/getAvailableServices');
    },

    schedule: function (appointment) {
      return $http.post('/appointment/schedule', {appointment});
    },
    createOwnerInformation: function(appointment) {
      return $http.post('/appointment/createOwnerInformation', 
        {
          first_name : appointment.first_name,
          last_name : appointment.last_name,
          email : appointment.email,
          phone_number : appointment.phone_number
        });
    },
    createAppointment: function(appointment) {
      return $http.post('/appointment/createAppointment', appointment);
    },
    createServices: function(services, appointment_id) {
      return $http.post('/appointment/createAppointmentServices', {services, appointment_id});
    },
    appointmentConfirmation: function(appointment_id) {
      return $http.get('/appointment/confirmation/'+appointment_id);
    },
	  cancelAppointment: function(id) {
	  return $http.post('/appointment/cancelAppointment',{id : id});
	}
  };
}
