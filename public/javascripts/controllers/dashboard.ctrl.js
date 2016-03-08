// dashboardCtrl
app.controller('dashboardCtrl', function($scope, $http, $route, $rootScope) {
  console.log('dashboardCtrl called');
  /*$rootScope.session = {}
  $rootScope.session.user = req.user;*/
  // Get cert files
  $http.get('cert_files/certs.json').success(function(data) {
    $scope.certs = data;
  });
  $scope.updateUser = function(user) {
    console.log(user);
  }


});
