angular.module("passportModule")
.controller("passportController", passportController);

passportController.$inject = ['$scope','$timeout', 'passportService'];

function passportController($scope, $timeout, passportService) {
  $scope.user = {
    email : "",
    password : ""
  };

  function displayMessage() {
      $scope.message.containsSuccessfulMessage  = true;
      $scope.message.successfulMessage = 'User added successfully';
  }
  
  function clearMessage() {
      $scope.message.containsSuccessfulMessage  = false;
      $scope.message.successfulMessage = "";
  }
  
  function clearProductCategory() {
      $scope.productCategory.categoryName = "";
      $scope.productCategory.categoryDetails = "";
  }
  
  $scope.signup = function (user) {
      console.log(user);
    passportService.signup(user)
    .success(function (data) {
      if (data.status && data.status == 'successful') {
          displayMessage();
          $timeout( function afterTimeOut() {
              clearMessage();
              clearProductCategory();
          }, 5000);
          
      } else {
          $scope.message = "blahh";
      }
    });
  };
  
  $scope.login = function (user) {
      console.log(user);
    passportService.login(user)
    .success(function (data) {
        console.log(data.status);
      if (data.status && data.status == 'successful') {
          displayMessage();
          $timeout( function afterTimeOut() {
              clearMessage();
          }, 5000);
          
      } else {
          $scope.message = "blahh";
      }
    });
  }
}