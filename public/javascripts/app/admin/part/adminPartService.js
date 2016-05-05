angular.module("adminPartModule")
.factory("adminPartService", adminPartService);

adminPartService.$inject = ['$http'];

function adminPartService($http) {
  return {
		updatePart: function (id, part) {
      return $http.post('/admin/parts/updatePart',
        {
            part: {
                id: id,
                name: part.name,
                description: part.description,
                category: part.category
            }
        }
       );
    },
    createPart : function (part) {
      return $http.post('/admin/parts/createPart', {part : part});
    },
    markDeleted : function(id) {
      return $http.post('/admin/parts/markDeleted', {id : id});
    }
  };
}
