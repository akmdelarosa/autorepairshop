angular.module("adminProfileModule")
.factory("adminProfileService", adminProfileService);

adminProfileService.$inject = ['$http'];

function adminProfileService($http) {
  return {
		updateUser: function (id, user) {
      return $http.post('/admin/user/edit',
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
