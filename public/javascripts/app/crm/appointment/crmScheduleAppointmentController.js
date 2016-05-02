angular.module("crmAppointmentModule")
.controller("crmScheduleAppointmentController", crmScheduleAppointmentController)
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

crmScheduleAppointmentController.$inject = ['$scope','$timeout','$filter','crmAppointmentService'];

function crmScheduleAppointmentController($scope, $timeout, $filter, crmAppointmentService) {
  
  $scope.schedule = function (appointment) {
    appointment.model = appointment.model.model;
    appointment.time = appointment.time.time;
    console.log(appointment);
    crmAppointmentService.schedule(appointment)
    .success(function(data) {
      if (data.status && data.status == 'success') {
        console.log("data response below on schedule");
        console.log(data);
        
        $scope.message = 'Appointment scheduled successfully';
        
        window.location.href="/crm/appointments/today";
      }
    })
  };

    getAllAvailableAppointmentSlots();
    function getAllAvailableAppointmentSlots() {
      crmAppointmentService.getAllAvailableAppointmentSlots()
      .success(function (data) {
        if (data && data.slots && data.slots.length > 0) {
          $scope.slots = data.slots;
          console.log(data.slots);
          var dates = {};
            for (var i = 0; i < data.slots.length; i++) {
                var temp = data.slots[i];
                var date = moment(temp.date, 'YYYY-MM-DD').format('MM/DD/YYYY');
                if (typeof dates[temp.date] == 'undefined') {
                    dates[temp.date] = temp.date;
                }
            }
            $scope.dates = dates;

        } else {
            $scope.error = "There was an error while processing your request. Error code : " + data.error;
        }
      });
    }
    
    getVehiclesList();
    function getVehiclesList() {
      crmAppointmentService.getVehiclesList()
      .success(function (data) {
        if (data && data.list && data.list.length > 0) {
          $scope.list = data.list;
          var years = {};
          for (var i = 0; i < data.list.length; i++) {
              var temp = data.list[i];
              if (typeof years[temp.year] == 'undefined') {
                  years[temp.year] = temp.year;
              }
          }
          $scope.years = years;
        
        } else {
            $scope.error = "There was an error while processing your request. Error code : " + data.error;
        }
      });
    }
    
    getAvailableServices();
    function getAvailableServices() {
      crmAppointmentService.getAvailableServices()
      .success(function (data) {
        if (data && data.services && data.services.length > 0) {
          $scope.services = data.services;
        } else {
          $scope.error = "There was an error while processing your request. Error code : " + data.error;
        }
      });
    }
  
    $scope.$watch('appointment.date', function(newVal) {
      $scope.times = newVal ? $filter('filter')($scope.slots, newVal) :
                                          $scope.slots;
    });
    
    $scope.$watch('appointment.year', function(newVal) {
      $scope.filtered_makes = newVal ? $filter('filter')($scope.list, {year: newVal}) :
                                          $scope.list;
      if (newVal) {
        var makes = {};
        for (var i = 0; i < $scope.filtered_makes.length; i++) {
            var temp = $scope.filtered_makes[i];
            if (typeof makes[temp.make] == 'undefined') {
                makes[temp.make] = temp.make;
            }
        }
        $scope.makes = makes;
      }
    });
    
    $scope.$watch('appointment.make', function(newVal) {
      $scope.models = newVal ? $filter('filter')($scope.list, {year: $scope.appointment.year, make: newVal}) :
                                          $scope.list;                                  
    });
  
  
    
}