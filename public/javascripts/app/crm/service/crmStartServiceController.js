angular.module("crmServiceModule")
.controller("crmStartServiceController", crmStartServiceController)
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

crmStartServiceController.$inject = ['$scope','$timeout', 'crmServiceService'];

function crmStartServiceController($scope, $timeout, crmServiceService) {
    
    $scope.startService = function (id, mileage_read,vin) {
        console.log('id',id);
        console.log('mileage_read',mileage_read);
        crmServiceService.startService(id,mileage_read,vin)
        .success(function(data) {
            if (data.status == 'success'){
                $scope.message = 'Service started successfully.';
                $timeout( function afterTimeOut() {
                    window.location.href="/crm/services/today";
                }, 5000);
            } else {
                $scope.error = "There was an error while processing your request.";
            }
        });
    };
}