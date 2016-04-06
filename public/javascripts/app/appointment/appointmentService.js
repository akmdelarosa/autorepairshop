angular.module("appointmentModule")
.factory("appointmentService", appointmentService);

appointmentService.$inject = ['$http'];

function appointmentService($http) {
  return {
    createAppointment: function (appointment) {
      return $http.post('/createAppointment',
        {
            
          date : appointment.date,
          time : appointment.time,
          service : appointment.service
        }
       );
    },

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
      return $http.get('/appointment/getAvailableAppointmentDates');
    }
  };
}
