angular.module("adminRateModule")
.controller("adminCreateRateController", adminCreateRateController)
.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
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
})
.directive('textarea', function ($parse) {
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

adminCreateRateController.$inject = ['$scope','$timeout', '$window', 'adminRateService'];

function adminCreateRateController($scope, $timeout, $window, adminRateService) {
  
  $scope.rate = {
    year : '',
    make : '',
    model : ''
  };
    
    $scope.createRate = function (rate) {
      console.log(rate);
    adminRateService.createRate(rate)
    .success(function (data) {
      if (data.status == 'success') {
         $scope.message = "Rate added successfully";
         $timeout( function afterTimeOut() {
             $window.location.href ='/admin/rates/index'; 
          }, 5000);
      } else {
        $scope.error = "There was an error while processing your request. Error code: "  + data.error;
      }
    });
  };
  
  getYears();

  function getYears() {
  	$scope.years = {};
  	adminRateService.getYears()
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
  	adminRateService.getAllMakesByYear($scope.rate.year)
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
  	adminRateService.getAllModelsByYearAndMake($scope.rate.year, $scope.rate.make)
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
    adminRateService.getAvailableServices()
    .success(function (data) {
      if (data && data.services && data.services.length > 0) {
        $scope.services = data.services;
      }
    });
  }
  
  $scope.$watch('rate.year', function (newVal) {
  	$scope.rate.year = newVal;
  	if ($scope.rate.year) {
  		getAllMakesByYear();
  	}
  });

  $scope.$watch('rate.make', function (newVal) {
  	$scope.rate.make = newVal;
  	if ($scope.rate.make) {
  		getAllModelsByYearAndMake();
  	}
  });

  $scope.$watch('rate.model', function (newVal) {
  	$scope.rate.model = newVal;
  	if ($scope.rate.model) {
  		getAvailableServices();
  	}
  });
  
  $scope.$watch('rate.service', function (newVal) {
  	$scope.rate.service = newVal;
  });
}