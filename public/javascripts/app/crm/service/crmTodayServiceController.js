angular.module("crmServiceModule")
.controller("crmTodayServiceController", crmTodayServiceController)
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

crmTodayServiceController.$inject = ['$scope','$timeout', '$filter', 'NgTableParams', 'crmServiceService'];

function crmTodayServiceController($scope, $timeout, $filter, NgTableParams, crmServiceService) {
    
    getServicesToday();
    var date = moment().format('YYYY-MM-DD');
    function getServicesToday() {
        crmServiceService.getServicesByDate(date)
        .success(function(data) {
            if (data && data.services && data.services.length > 0) {
                $scope.services = data.services;
                console.log(data.services);
                $scope.tableParams = new NgTableParams(
                    {count: 10}, 
                    { counts: [], 
                        getData: function($defer, params) {
                            var filteredData = params.filter() ?
                                    $filter('filter')($scope.services, params.filter()) :
                                        $scope.services;
                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                            $scope.tableParams.total($scope.services.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                       }
                });
            } else {
                $scope.error = "No services scheduled for today.";
            }
        });
    }
}