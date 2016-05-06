angular.module("adminUserModule")
.factory("adminUserService", adminUserService);

adminUserService.$inject = ['$http'];

function adminUserService($http) {
  return {
		getAllUsers: function() {
			return $http.get('/admin/users/getAllUsers');
		},
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
    },
		deleteUserVehicle: function(userId, vehicleId) {
	  	return $http.post('/admin/users/deleteUserVehicle',{userId : userId, vehicleId : vehicleId});
		}
    ,
    markDeleted : function(id) {
      return $http.post('/admin/users/markDeleted', {id : id});
    }
  };
}
