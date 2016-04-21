angular.module("adminAppointmentModule")
.controller("adminViewAppointmentController", adminViewAppointmentController)
.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
});

adminViewAppointmentController.$inject = ['$scope','$timeout', '$filter', 'NgTableParams', 'adminAppointmentService'];

function adminViewAppointmentController($scope, $timeout, $filter, NgTableParams, adminAppointmentService) {
    $scope.appointments = {};
    getAllAppointments();
    function getAllAppointments() {
        adminAppointmentService.getAllAppointments()
        .success(function(data){
            if (data && data.appointments && data.appointments.length > 0 ) {
                $scope.appointments = data.appointments;
                getAllAppointmentsServices();
            }
        });
    }
    
    function getAllAppointmentsServices() {
        adminAppointmentService.getAllAppointmentsServices()
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
            }
        });
    }
    
}