// dashboardCtrl
app.controller('dashboardCtrl', function($scope, $http, $route) {
  //console.log('dashboardCtrl called');
  $http.get('cert_files/certs.json').success(function(data) {
    $scope.certs = data;
  });
  $scope.getUser = function(user) {
    console.log(user);
  }


});
