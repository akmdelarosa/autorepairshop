angular.module("adminServiceModule")
.factory("adminServiceService", adminServiceService);

adminServiceService.$inject = ['$http'];

function adminServiceService($http) {
  return {
		updateService: function (id, service) {
      return $http.post('/admin/services/updateService',
        {
            service: {
                id: id,
                name: service.name,
                description: service.description,
                category: service.category
            }
        }
       );
    },
    createService : function (service) {
      return $http.post('/admin/services/createService', {service : service});
    },
    removeServicePart : function (servicePartId) {
      return $http.post('/admin/services/removeServicePart', {servicePartId : servicePartId});
    },
    markDeleted : function(id) {
      return $http.post('/admin/services/markDeleted', {id : id});
    }
  };
}
