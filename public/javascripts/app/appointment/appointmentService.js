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
    getAllAppointments: function () {
      return $http.get('/getAllAppointments/');
    }
  };
}
