//console.log('ptuApp.config.js loaded');
var app = angular.module("ptuApp", ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/login', {
      controller: 'loginCtrl'
    })
    .when('/signup', {
      controller: 'signupCtrl'
    })
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
    .otherwise({ redirectTo: '/'});
});
