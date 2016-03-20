angular.module("productCategoryModule")
.controller("productCategoryController", productCategoryController);

productCategoryController.$inject = ['$scope','$timeout', 'productCategoryService'];

function productCategoryController($scope, $timeout, productCategoryService) {
  $scope.productCategory = {
    categoryName : "",
    categoryDetails : ""
  };

  function displayMessage() {
      $scope.message.containsSuccessfulMessage  = true;
      $scope.message.successfulMessage = 'Category added successfully';
  }
  
  function clearMessage() {
      $scope.message.containsSuccessfulMessage  = false;
      $scope.message.successfulMessage = "";
  }
  
  function clearProductCategory() {
      $scope.productCategory.categoryName = "";
      $scope.productCategory.categoryDetails = "";
  }
  
  $scope.createProductCategory = function (productCategory) {
      console.log(productCategory);
    productCategoryService.createProductCategory(productCategory)
    .success(function (data) {
      if (data.status && data.status == 'successful') {
          displayMessage();
          $timeout( function afterTimeOut() {
              clearMessage();
              clearProductCategory();
          }, 5000);
          
      }
    });
  }
}