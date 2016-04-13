angular.module("appointmentModule")
.controller("scheduleAppointmentStep1Controller", scheduleAppointmentStep1Controller);

scheduleAppointmentStep1Controller.$inject = ['$scope', '$timeout', 'moment', '$filter',  'appointmentService'];

function scheduleAppointmentStep1Controller($scope, $timeout, moment, $filter, appointmentService) {
	$scope.appointment ={
        year:'', 
        make: '', 
        model: '',
        services: [],
        date: '',
        time: ''
    };
  
  $scope.displayYearMakeModelNextButton = true;
  $scope.displayDateTimeNextButton = false;
  $scope.displayDateTimeBlock = false;
  $scope.displayServiceBlock = false;
  $scope.displayServiceNextButton = false;

  $scope.vehicleLists = [];
  $scope.selectedServices = [];

  getYears();

  $scope.showDateTimeBlock = function () {
  	console.log($scope.appointment);
  	getDates();
  	$scope.displayYearMakeModelNextButton = false;
    $scope.displayDateTimeNextButton = true;
    $scope.displayDateTimeBlock = true;
  }

  $scope.showServiceBlock = function () {
  	console.log($scope.appointment);
    getAvailableServices();
  	$scope.displayServiceBlock = true;
    $scope.displayServiceNextButton = true;
    $scope.displayDateTimeNextButton = false;
    $scope.displayYearMakeModelNextButton = false;
  }

  $scope.updateServices = function (services) {
    console.log("updating services called");
    console.log(services);
    $scope.appointment.services = services;
    console.log($scope.appointment);
    nextStep();
  }

  function nextStep() {
    appointmentService.scheduleAppointmentStep2($scope.appointment)
    .success(function (data) {
      if (data.status && data.status == 'successful') {
        $scope.message = 'Profile updated successfully';
      }
    });
  }

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
  	appointmentService.getAllMakesByYear($scope.year)
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
  	appointmentService.getAllModelsByYearAndMake($scope.year, $scope.make)
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
  	appointmentService.getAvailableTimeSlotsForDate($scope.date)
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

  $scope.$watch('year', function (newVal) {
  	getAllMakesByYear();
  	$scope.appointment.year = newVal;
  });

  $scope.$watch('make', function (newVal) {
  	getAllModelsByYearAndMake();
  	$scope.appointment.make = newVal;
  });

  $scope.$watch('model', function (newVal) {
  	$scope.appointment.model = newVal;
  });

  $scope.$watch('date', function (newVal) {
  	getSlotsForDate();
    $scope.appointment.date = newVal;
  });

  $scope.$watch('time', function (newVal) {
    var temp = moment(newVal,'LT').format('HH:mm:ss');
  	$scope.appointment.time = temp;
  });

}