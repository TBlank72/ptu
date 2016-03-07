console.log('certs.ctrl.js loaded')
angular.module('ptuApp')
  .controller('cptCtrl', function($scope) {
    $scope.message = "cpt";
  })
  .controller('cmtCtrl', function($scope) {
    $scope.message = "cmt";
  })
  .controller('cnsCtrl', function($scope) {
    $scope.message = "cns";
  })
