angular.module("adminPriceModule")
.controller("adminCreatePriceController", adminCreatePriceController)
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

adminCreatePriceController.$inject = ['$scope','$timeout', '$window', 'adminPriceService'];

function adminCreatePriceController($scope, $timeout, $window, adminPriceService) {
  
  $scope.price = {
    year : '',
    make : '',
    model : ''
  };
    
    $scope.createPrice = function (price) {
      console.log(price);
    adminPriceService.createPrice(price)
    .success(function (data) {
      if (data.status == 'success') {
         $scope.message = "Price added successfully";
         $timeout( function afterTimeOut() {
             $window.location.href ='/admin/prices/index'; 
          }, 5000);
      } else {
        $scope.error = "There was an error while processing your request. Error code: "  + data.error;
      }
    });
  };
  
  getYears();

  function getYears() {
  	$scope.years = {};
  	adminPriceService.getYears()
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
  	adminPriceService.getAllMakesByYear($scope.price.year)
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
  	adminPriceService.getAllModelsByYearAndMake($scope.price.year, $scope.price.make)
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
  
  function getAvailableParts() {
    adminPriceService.getAvailableParts()
    .success(function (data) {
      if (data && data.parts && data.parts.length > 0) {
        $scope.parts = data.parts;
      } else {
        $scope.message - "There was an error while processing your request. Error code: " + data.error;
      }
    });
  }
  
  $scope.$watch('price.year', function (newVal) {
  	$scope.price.year = newVal;
  	if ($scope.price.year) {
  		getAllMakesByYear();
  	}
  });

  $scope.$watch('price.make', function (newVal) {
  	$scope.price.make = newVal;
  	if ($scope.price.make) {
  		getAllModelsByYearAndMake();
  	}
  });

  $scope.$watch('price.model', function (newVal) {
  	$scope.price.model = newVal;
  	if ($scope.price.model) {
  		getAvailableParts();
  	}
  });
  
  $scope.$watch('price.part', function (newVal) {
  	$scope.price.part = newVal;
  });
}