angular.module("adminPriceModule")
.factory("adminPriceService", adminPriceService);

adminPriceService.$inject = ['$http'];

function adminPriceService($http) {
  return {
		updatePrice: function (id, price) {
      return $http.post('/admin/prices/edit/'+id,
        {
            price: {
                min_price: price.min_price,
                max_price: price.max_price
            }
        }
       );
    },
    createPrice : function (vehicle) {
      return $http.post('/admin/prices/createPrice', {vehicle : vehicle});
    },
    getAllPartsPrices : function () {
      return $http.get('/admin/prices/getAllPartsPrices');
    }
  };
}
