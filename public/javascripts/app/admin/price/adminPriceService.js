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
    createPrice : function (vehiclePartPrice) {
      return $http.post('/admin/prices/createPrice', {
        vehiclePartPrice: {
          min_price : vehiclePartPrice.min_price,
          max_price : vehiclePartPrice.max_price,
          part_id : vehiclePartPrice.part.id,
          year : vehiclePartPrice.year,
          make : vehiclePartPrice.make,
          model : vehiclePartPrice.model
        }
      });
    },
    getAllPartsPrices : function () {
      return $http.get('/admin/prices/getAllPartsPrices');
    },
    getAllMakesByYear: function (year) {
      console.log('year in service below');
      console.log(year);
      return $http.get('/vehicle/getAllMakesByYear/'+ year);
    },

    getYears: function() {
      return $http.get('/vehicle/getYears');
    },

    getAllModelsByYearAndMake: function(year, model) {
      return $http.get('/vehicle/getAllModelsByYearAndMake/'+year+'/'+model);
    },

    getAvailableParts: function() {
      return $http.get('/admin/prices/getAllParts');
    }
  };
}
