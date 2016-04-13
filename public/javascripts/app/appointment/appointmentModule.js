angular.module("appointmentModule", ['mwl.calendar', 'ui.bootstrap', 'checklist-model', 'multiStepForm'])
.filter('moment', function () {
  return function (input, momentFn /*, param1, param2, ...param n */) {
    var args = Array.prototype.slice.call(arguments, 2),
        momentObj = moment(input);
    return momentObj[momentFn].apply(momentObj, args);
  };
})
.directive('input', function ($parse) {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function (scope, element, attrs) {
      if (attrs.ngModel && attrs.value) {
        $parse(attrs.ngModel).assign(scope, attrs.value);
      }
    }
  };
});
/*
// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('scheduleAppointment', {
            url: '/appointment/scheduleAppointment',
            templateUrl: 'scheduleAppointment.ejs',
            controller: 'appointmentController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('scheduleAppointment.vehicleinfo', {
            url: '/profile',
            templateUrl: 'vehicleinfo.ejs'
        })
        
        // url will be /form/interests
        .state('scheduleAppointment.appointmentDateTime', {
            url: '/interests',
            templateUrl: 'appointmentDateTime.ejs'
        })
        
        // url will be /form/payment
        .state('scheduleAppointment.serviceInfo', {
            url: '/payment',
            templateUrl: 'serviceInfo.ejs'
        });

        // url will be /form/payment
        .state('scheduleAppointment.ownerInfo', {
            url: '/ownerInfo',
            templateUrl: 'ownerInfo.ejs'
        });
        
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/appointment/scheduleAppointment');
});*/