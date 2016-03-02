angular.module("productCategoryModule")
.controller("editProductCategoryController", editProductCategoryController);

editProductCategoryController.$inject = ['$scope', '$timeout', 'productCategoryService'];

function editProductCategoryController($scope, $timeout, productCategoryService) {
  $scope.productCategories = [];

  getAllProductCategories();

  function getAllProductCategories() {
    productCategoryService.getAllProductCategories()
    .success(function (data) {
      if (data && data.productCategories && data.productCategories.length > 0) {
        $scope.productCategories = data.productCategories;
      }
    });
  }
}