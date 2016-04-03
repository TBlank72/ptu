//console.log('ptuApp.config.js loaded');
var app = angular.module("ptuApp", ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/dashboard', {
      controller: 'dashboardCtrl'
    })
    .when('/contact-info', {
      templateUrl: 'partials/contact-info.jade',
      controller: 'dashboardCtrl'
    })
    .when('/my-certs', {
      templateUrl: 'partials/my-certs.jade',
      controller: 'dashboardCtrl'
    })
    .when('/password', {
      templateUrl: 'partials/password.jade',
      controller: 'dashboardCtrl'
    })
    .when('/getusers', {
      templateUrl: 'partials/getusers.jade',
      controller: 'adminCtrl'
    })
    .otherwise({ redirectTo: '/'});
});
