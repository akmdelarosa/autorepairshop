angular.module("appointmentModule")
.controller("scheduleAppointmentController", scheduleAppointmentController);

scheduleAppointmentController.$inject = ['$scope', '$timeout', 'appointmentService'];

function scheduleAppointmentController($scope, $timeout, appointmentService) {
	$scope.appointment ={
        first_name:'', 
        last_name: '',
        email: '',
        phone: '',
        year:'', 
        make: '', 
        model: '',
        sesrvice: '',
        date: '',
        time: ''
    };
  $scope.vehicleLists = [];
  $scope.displayNextButton = true;
  $scope.displayShowPersonalInfoForm = false;

  getYears();

  $scope.selectDateTime = function () {
  	console.log($scope.appointment);
  	getDates();
  	$scope.displayNextButton = false;
  }

  $scope.getPersonalInfo = function () {
  	console.log($scope.appointment);
  	$scope.displayShowPersonalInfoForm = true;
  }

  function getYears() {
  	$scope.years = {};
  	appointmentService.getYears()
    .success(function (data) {
      if (data && data.years && data.years.length > 0) {
      	var years = [];
        for (var i = data.years.length - 1; i >= 0; i--) {
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
        for (var i = data.makes.length - 1; i >= 0; i--) {
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
        for (var i = data.models.length - 1; i >= 0; i--) {
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
        for (var i = data.available_dates.length - 1; i >= 0; i--) {
        	var temp = data.available_dates[i];
        	dates.push(temp.date);
        };
        $scope.dates = dates;
        console.log($scope.dates);
      }
    });
  }

  function getAvailableTimeSlotsForDate() {
  	appointmentService.getAvailableTimeSlotsForDate($scope.date)
    .success(function (data) {
      if (data && data.models && data.models.length > 0) {
      	var models = [];
        for (var i = data.models.length - 1; i >= 0; i--) {
        	var temp = data.models[i];
        	models.push(temp.model);
        };
        $scope.models = models;
        console.log($scope.models);
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
  	//getAvailableAppointmentDates();
  	$scope.appointment.model = newVal;
  });

  $scope.$watch('date', function (newVal) {
  	//getAvailableTimeSlotsForDate();
  	$scope.appointment.date = newVal;
  });

  $scope.$watch('time', function (newVal) {
  	$scope.appointment.time = newVal;
  });

}