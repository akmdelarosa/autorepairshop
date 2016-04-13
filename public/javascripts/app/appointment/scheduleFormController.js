angular.module("appointmentModule")
.controller('scheduleFormController', [
    '$scope',
    'multiStepFormScope',
    function ($scope, multiStepFormScope) {
    	console.log($scope);
    	console.log(multiStepFormScope);
        $scope.appointment = angular.copy(multiStepFormScope.appointment);
        $scope.$on('$destroy', function () {
            multiStepFormScope.appointment = angular.copy($scope.appointment);
        });
    }
]);