angular.module("crmProfileModule")
.factory("crmProfileService", crmProfileService);

crmProfileService.$inject = ['$http'];

function crmProfileService($http) {
  return {
		updateUser: function (id, user) {
      return $http.post('/crm/user/edit',
        {
            user: {
                id: id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number
            }
        }
       );
    }
  };
}
