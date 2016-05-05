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

crmTodayServiceController.$inject = ['$scope','$timeout', '$window', '$filter', 'NgTableParams', 'crmServiceService'];

function crmTodayServiceController($scope, $timeout, $window, $filter, NgTableParams, crmServiceService) {
    
    getServicesToday();
    getAllRepairStatus();
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
        })
        .error(function(err) {
            displayErr(err.statusText);
        });
    }
    function getAllRepairStatus() {
        crmServiceService.getAllRepairStatus()
        .success(function(data) {
            if (data.repair_status && data.repair_status.length > 0) {
                $scope.repair_status = $filter('filter')(data.repair_status, {status: '!completed'});
            } else {
                $scope.error = "No status found.";
            }
        })
        .error(function(err) {
            displayErr(err.statusText);
        });
    }
    
    function displayErr(errMsg) {
      $scope.error = errMsg;
    }
    
    $scope.updateStatus = function (id, status_id) {
        console.log('id',id);
        console.log('status', status_id);
        crmServiceService.updateStatus(id,status_id)
        .success(function(data) {
            if (data.status == 'success') {
                $scope.message = "Service successfully updated.";
            } else {
                $scope.error = "No service found to be updated.";
            }
        })
        .error(function(err) {
            displayErr(err.statusText);
        });
    };
    
    $scope.markCompleted = function (id) {
        console.log('id',id);
        crmServiceService.markCompleted(id)
        .success(function(data) {
            if (data.status == 'success') {
                $scope.message = "Service successfully completed.";
                $timeout( function afterTimeOut() {
                    $window.location.reload();
                }, 2000);
            } else {
                $scope.error = "No service found to be updated.";
            }
        })
        .error(function(err) {
            displayErr(err.statusText);
        });
    };
}