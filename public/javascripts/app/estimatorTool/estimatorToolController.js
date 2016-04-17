angular.module("estimatorToolModule")
.controller("estimatorToolController", estimatorToolController);

estimatorToolController.$inject = ['$scope', '$timeout', '$filter', 'ngDialog', 'estimatorToolService'];

function estimatorToolController($scope, $timeout, $filter, ngDialog, estimatorToolService) {

  getYears();

  function getYears() {
  	estimatorToolService.getYears()
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
  	estimatorToolService.getAllMakesByYear($scope.year)
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
  	estimatorToolService.getAllModelsByYearAndMake($scope.year, $scope.make)
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

  function getAvailableServices() {
    estimatorToolService.getAvailableServices()
    .success(function (data) {
		console.log(data);
      if (data && data.services && data.services.length > 0) {
        $scope.services = data.services;
		console.log(data.services);
      }
    });
  }
  
  function getPricesAndRates() {
      estimatorToolService.getPricesAndRates($scope.year, $scope.make, $scope.model, $scope.service.id)
      .success(function (data) {
	      if (data && data.results) {
	        $scope.min_price = data.results.min_price;
			$scope.max_price = data.results.max_price;
			$scope.min_rate = data.results.min_rate;
			$scope.max_rate = data.results.max_rate;
			console.log("data received from call");
			console.log(data);
	      }
	  });
  }
  
  function getPartsByVehicleAndService() {
      estimatorToolService.getPartsByVehicleAndService($scope.year, $scope.make, $scope.model, $scope.service.id)
      .success(function (data) {
	      if (data && data.parts && data.parts.length > 0) {
			  $scope.parts = data.parts;
			console.log(data.parts);
	      }
     });
  }

  $scope.$watch('year', function (newVal) {
  	getAllMakesByYear();
  	$scope.year = newVal;
  });

  $scope.$watch('make', function (newVal) {
	if ($scope.make && $scope.year) {
	  getAllModelsByYearAndMake();
	}
  	$scope.make = newVal;
  });

  $scope.$watch('model', function (newVal) {
	if ($scope.model && $scope.make && $scope.year) {
	  getAvailableServices();
	}
	console.log(newVal);
  	$scope.model = newVal;
  });

  $scope.$watch('service', function (newVal) {
	  console.log(newVal);
    $scope.service = newVal;
  });

  $scope.getEstimate = function() {
	  getPricesAndRates();
	  getPartsByVehicleAndService();
	  $scope.submit = true;
  };
  
  $scope.showInfo = function () {
          ngDialog.open({ template: 'dialogInfo', className: 'ngdialog-theme-default' });
      };
  

}