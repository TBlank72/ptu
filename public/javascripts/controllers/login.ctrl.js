// loginCtrl

angular.module('ptuApp').controller('loginCtrl', function($scope, $http, $rootScope, $window, AuthService) {
  $rootScope.authenticated = false;

  $scope.login = function(user) {
    /*$http.post('/login', user).success(function(data) {
      if(data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user;
        console.log(data.user);
        console.log(user);
        $window.location.href = '/dashboard';
      }
      else {
        //$scope.error_message = data.message;

      }
    })*/

  } // end login function
})
