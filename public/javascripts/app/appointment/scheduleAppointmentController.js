angular.module("appointmentModule")
.controller("scheduleAppointmentController", scheduleAppointmentController)
.directive("myDirective", function(){
    return {
        restrict: "EA",
        scope: {},
        template: "<div>Your vehicle is : {{appointment.year}} {{appointment.make}} {{appointment.model}}</div>"
    };
});;

scheduleAppointmentController.$inject = ['$scope', '$timeout', 'moment', '$filter', '$window', 'appointmentService'];

function scheduleAppointmentController($scope, $timeout, moment, $filter, $window, appointmentService) {
	$scope.appointment ={};

  $scope.steps = [
    {
        templateUrl: 'scheduleStep1',
        hasForm: true,
        nextAction: 'showDateTimeBlock()',
        form_name: 'formSelectVehicle'
    },
    {
        templateUrl: 'scheduleStep2',
        hasForm: true,
        nextAction: 'showServiceBlock()',
        form_name: 'formSelectDateTime'
    },
    {
        templateUrl: 'scheduleStep3',
        hasForm: true,
        nextAction: 'showOwnerInfoBlock()',
        form_name: 'formSelectServices'
    },
    {
        templateUrl: 'scheduleStep4',
        hasForm: true,
        nextAction: 'submitForm()',
        form_name: 'formSchedule'
    },
    {
        templateUrl: 'scheduleStep5'    }
  ];

  $scope.cancel = function () {
    $window.location.href = '/';
  };

  $scope.finish = function () {
    console.log('finish');
    console.log($scope.appointment);
    //createOwnerInformation();
    
    appointmentService.schedule($scope.appointment)
    .success(function(data) {
      if (data.status && data.status == 'success') {
        console.log("data response below on schedule");
        console.log(data);
        window.location.href="/appointment/confirmation/"+data.appointment_id;
        $scope.message = 'Appointment scheduled successfully';
      }
    });
  };

  getYears();

  function getYears() {
  	$scope.years = {};
  	appointmentService.getYears()
    .success(function (data) {
      if (data && data.years && data.years.length > 0) {
      	var years = [];
        for (var i = 0; i < data.years.length; i++) {
        	var temp = data.years[i];
        	years.push(temp.year);
        };
        $scope.years = years;
        console.log($scope.years);
      }
    });
  }

  function getAllMakesByYear() {
  	appointmentService.getAllMakesByYear($scope.appointment.year)
    .success(function (data) {
      if (data && data.makes && data.makes.length > 0) {
      	var makes = [];
        for (var i = 0; i < data.makes.length; i++) {        	
          var temp = data.makes[i];
        	makes.push(temp.make);
        };
        $scope.makes = makes;
        console.log($scope.makes);
      }
    });
  }

  function getAllModelsByYearAndMake() {
  	appointmentService.getAllModelsByYearAndMake($scope.appointment.year, $scope.appointment.make)
    .success(function (data) {
      if (data && data.models && data.models.length > 0) {
      	var models = [];
        for (var i = 0; i < data.models.length; i++) {
        	var temp = data.models[i];
        	models.push(temp.model);
        };
        $scope.models = models;
        console.log($scope.models);
      }
    });
  }

  function getDates() {
  	appointmentService.getAvailableAppointmentDates()
    .success(function (data) {
      if (data && data.available_dates && data.available_dates.length > 0) {
      	var dates = [];
        for (var i = 0; i < data.available_dates.length; i++) {
        	var temp = data.available_dates[i];
          temp.date = $filter('date')(temp.date, "yyyy-MM-dd")
        	dates.push(temp.date);
        };
        $scope.dates = dates;
        console.log($scope.dates);
      }
    });
  }

  function getSlotsForDate() {
  	appointmentService.getAvailableTimeSlotsForDate($scope.appointment.date)
    .success(function (data) {
      if (data && data.time_slots && data.time_slots.length > 0) {
      	var times = [];
        for (var i = 0; i < data.time_slots.length; i++) {
        	var temp = data.time_slots[i];
          temp.time = moment(temp.time,'HH:mm').format('LT');
        	times.push(temp.time);
        };
        $scope.times = times;
      }
    });
  }

  function getAvailableServices() {
    appointmentService.getAvailableServices()
    .success(function (data) {
      if (data && data.services && data.services.length > 0) {
        $scope.services = data.services;
      }
    });
  }

  function createOwnerInformation() {
    appointmentService.createOwnerInformation($scope.appointment)
    .success(function (data) {
      if (data && data.user_id) {
        $scope.appointment.user_id = data.user_id;
      } else if (data && data.customer_id) {
        $scope.appointment.cusomer_id = data.customer_id;
      }
      createAppointment();
    });
  }

  function createAppointment() {
    appointmentService.createAppointment($scope.appointment)
    .success(function (data) {
      if (data && data.appointment_id) {
      $scope.appointment_id = data.appointment_id;
      createServices();
    }
    });
  }

  function createServices() {
    appointmentService.createServices($scope.appointment.services, $scope.appointment_id)
    .success(function (data) {
      if (data.status == 'success') {
      finishSchedulingAppointment();
    }
    });
  }

  function finishSchedulingAppointment(id) {
    appointmentService.appointmentConfirmation(id)
    .success(function (data) {
      if (data.status == 'success') {
        $scope.message = "Appointment scheduled successfully.";
      }
    });
  }

  $scope.$watch('appointment.year', function (newVal) {
  	$scope.appointment.year = newVal;
  	if ($scope.appointment.year) {
  		getAllMakesByYear();
  	}
  });

  $scope.$watch('appointment.make', function (newVal) {
  	$scope.appointment.make = newVal;
  	if ($scope.appointment.make) {
  		getAllModelsByYearAndMake();
  	}
  });

  $scope.$watch('appointment.model', function (newVal) {
  	$scope.appointment.model = newVal;
  	if ($scope.appointment.model) {
  		getDates();
  	}
  });

  $scope.$watch('appointment.date', function (newVal) {
    $scope.appointment.date = newVal;
    if ($scope.appointment.date) {
  		getSlotsForDate();
  	}
  });

  $scope.$watch('appointment.time', function (newVal) {
    if ($scope.appointment.time) {
      getAvailableServices();
    }
  });
}