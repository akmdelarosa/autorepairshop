angular.module("productCategoryModule")
.factory("productCategoryService", productCategoryService);

productCategoryService.$inject = ['$http'];

function productCategoryService($http) {
  return {
    createProductCategory: function (productCategory) {
      return $http.post('/createProductCategory',
        {
            
          categoryName: productCategory.categoryName,
          details: productCategory.categoryDetails
        }
       );
    },
    getAllProductCategories: function () {
      return $http.get('/getAllProductCategory');
    }
  };
}
