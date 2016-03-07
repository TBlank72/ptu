//console.log('auth.service.js loaded');

angular.module('ptuApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {
    //// Begin AuthService Factory
    //create user variable
    var user = null;

    // return functions for use in controllers
    return ({
      //isLoggedIn: isLoggedIn,
      //getUserStatus: getUserStatus,
      login: login,
      //logout: logout,
      //signup: signup
    });
    //// Begin login function
    function login(email, password) {

      // create new instance of deferred
      var deferred = $q.defer();

      // send post request to server
      $http.post('/login',
        {username: email, password: password})
        //handle success
        .success(function(data, status) {
          if(status === 200 && data.status) {
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        //handle error
        .error(function(data) {
          user = false;
          deferred.reject();
        });

      //return promise object
      return deferred.promise;
    } // end login() function

}]); // End AuthService factory
