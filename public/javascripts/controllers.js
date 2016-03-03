
console.log('controllers.js loaded successfully');
var ptuApp = angular.module("ptuApp", ['ngRoute', 'ngResource']);

ptuApp.config(function($routeProvider) {
  console.log('ptuApp.config($routeProvider) called');
  $routeProvider
    .when('/dashboard', {
      controller: 'dashboardCtrl'
    })
    .when('/contact-info', {
      templateUrl: 'partials/contact-info.jade',
      controller: 'dashboardCtrl'
    })
    .when('/my-certs', {
      templateUrl: 'views/partials/my-certs.jade',
      controller: 'dashboardCtrl'
    })
    .when('/password', {
      templateUrl: '/views/partials/password.jade',
      controller: 'dashboardCtrl'
    });
});

ptuApp.controller('dashboardCtrl', function($scope, $http) {
  console.log('dashboardCtrl called');
  $http.get('cert_files/certs.json').success(function(data) {
    $scope.certs = data;
  })
});
