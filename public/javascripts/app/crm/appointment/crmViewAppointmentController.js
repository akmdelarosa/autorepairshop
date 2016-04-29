angular.module("crmAppointmentModule")
.controller("crmViewAppointmentController", crmViewAppointmentController)
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

crmViewAppointmentController.$inject = ['$scope', '$timeout', '$filter', 'NgTableParams', 'crmAppointmentService'];

function crmViewAppointmentController($scope, $timeout, $filter, NgTableParams, crmAppointmentService) {
    $scope.appointments = {};
    
    $scope.startService = function(id) {
        crmAppointmentService.startService(id)
        .success(function(data){
            if (data && data.status == 'success' ) {
                $scope.message = "Service started."
            } else {
                $scope.error = "There was an error processing your request. Error code : "+data.error;
            }
        });
    };
    
    $scope.cancelAppointment = function(id) {
        crmAppointmentService.cancelAppointment(id)
        .success(function(data){
            if (data && data.status == 'success' ) {
                $scope.message = "Appointment has been cancelled."
            } else {
                $scope.error = "There was an error processing your request. Error code : "+data.error;
            }
        });
    };
    
    var date = moment().format('YYYY-MM-DD');

    getAppointmentsToday();
    function getAppointmentsToday() {
        crmAppointmentService.getAppointmentsByDate(date)
        .success(function(data){
            if (data && data.appointments && data.appointments.length > 0 ) {
                $scope.appointments = data.appointments;
                getAppointmentsServices();
            } else {
                $scope.error = "There was an error processing your request. Error code : "+data.error;
            }
        });
    }
    
    function getAppointmentsServices() {
        crmAppointmentService.getAppointmentsServicesByDate(date)
        .success(function(data){
            if (data && data.services && data.services.length > 0 ) {
                $scope.services = data.services;
                
                var appointment_services = [];
                for (var i = 0; i < data.services.length; i++) {
                    var temp = data.services[i];
                    if (typeof appointment_services[temp.appointment_id] == 'undefined') {
                        appointment_services[temp.appointment_id] = "";
                    }
                    appointment_services[temp.appointment_id] += temp.name + ",";
                }
                
                for (key in $scope.appointments) {
                    var temp = appointment_services[$scope.appointments[key].id];
                    temp = temp.substring(0, temp.length - 1);
                    $scope.appointments[key].services = temp;
                    $scope.appointments[key].name = $scope.appointments[key].first_name + ' ' + $scope.appointments[key].last_name;
                    $scope.appointments[key].vehicle = $scope.appointments[key].year + ' ' +  $scope.appointments[key].make + ' ' + $scope.appointments[key].model;
                    
                }
                $scope.tableParams = new NgTableParams(
                    {count: 10}, 
                    { counts: [], 
                        getData: function($defer, params) {
                            var filteredData = params.filter() ?
                                    $filter('filter')($scope.appointments, params.filter()) :
                                        $scope.appointments;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                            $scope.tableParams.total($scope.appointments.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                       }
                });
            } else {
                $scope.error = "There was an error processing your request. Error code : "+data.error;
            }
        });
    }
    
}