// loginCtrl
angular.module('ptuApp').controller('loginCtrl', function($scope, $http, $log, AuthService) {

  $scope.login = function(user) {

    console.log(user);
    //AuthService.login(user);
    /*$http.post("/login", user)
      .success(function(response) {
        $scope.data = response.data;
        $log.info(response.data);
        //response.data should contain user info
      });*/

  } // end login function
})
