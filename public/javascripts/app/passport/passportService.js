angular.module("passportModule")
.factory("passportService", passportService);

passportService.$inject = ['$http'];

function passportService($http) {
  return {
    signup: function (user) {
      return $http.post('/signup',
        {
            
          email: user.email,
          password: user.password
        }
       );
    },
    login: function (user) {
      return $http.post('/login',
      {
        email: user.email,
        password: user.password
      }
      );
    }
  };
}
