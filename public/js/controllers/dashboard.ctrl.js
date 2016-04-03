// dashboardCtrl
app.controller('dashboardCtrl', function($scope, $http, $route, $rootScope) {
  console.log('dashboardCtrl called');
  // Get cert files
  $http.get('cert_files/certs.json').then(function(data) {
    $scope.certs = data;
  });


});
