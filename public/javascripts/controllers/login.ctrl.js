// loginCtrl
app.controller('loginCtrl', function($scope, $http, $log) {
  $scope.login = function(userLocal) {
    //// ----Move login and signup into an
    //// ---AuthService that can pass info to
    ///// ---- different controllers
    /// this is just an example below
    $http.post("/login", userLocal)
      .success(function(response) {
        $scope.data = response.data;
        $log.info(response.data);
        //response.data should contain user info
      });

  }
})
