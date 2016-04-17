angular.module("profileModule")
.factory("profileService", profileService);

profileService.$inject = ['$http'];

function profileService($http) {
  return {
    editProfile: function (user) {
      return $http.post('/profile/edit',
        {
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number
            }
        }
       );
    },
    getProfile: function (user) {
      return $http.get('/profile/edit',
        {
            
          user: user
        }
       );
    },
	getVehicles: function() {
		return $http.get('/profile/getCurrentUserVehicles');
	},
	getAppointments: function() {
		return $http.get('/profile/getCurrentUserAppointments');
	},
	getServiceHistory: function() {
		return $http.get('/profile/getCurrentUserServiceHistory');
	}
  };
}
