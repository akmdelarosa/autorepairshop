angular.module("passportModule")
.factory("passportService", passportService);

passportService.$inject = ['$http'];

function passportService($http) {
  return {
    edit: function (user) {
      return $http.post('/signup',
        {
          email: user.email,
          password: user.password
        }
       );
    }
  };
}
