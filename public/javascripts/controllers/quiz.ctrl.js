// quiz.ctrl.js 
console.log('quizCtrl loaded');

angular.module('ptuApp').controller('quizCtrl', ['$scope', '$http', '$rootScope', '$sce', '$window', 'AuthService', function($scope, $http, $rootScope, $sce, $window, AuthService) {
  
  $scope.score = 0;
  $scope.activeQuestion = -1;
  $scope.activeQuestionAnswered = 0;
  $scope.percentage = 0; 

  $http.get('javascripts/quiz.data.json').then(function(quizData){
    $scope.myQuestions = quizData.data;
    $scope.totalQuestions = $scope.myQuestions.length;
  });
  // selectAnswer function begin
  $scope.selectAnswer = function(qIndex, aIndex) {

    var questionState = $scope.myQuestions[qIndex].questionState;
    
    if (questionState != 'answered') {
      $scope.myQuestions[qIndex].selectedAnswer = aIndex;
      // correct answer from json file
      var correctAnswer = $scope.myQuestions[qIndex].correct;
      // passes correct answer to the $scope
      $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

      if (aIndex === correctAnswer) {
        $scope.myQuestions[qIndex].correctness = 'correct';
        $scope.score += 1;
      } // end if (answer index === correctAnswer)
      else {
        $scope.myQuestions[qIndex].correctness = 'incorrect';
      } // end else condition
    $scope.myQuestions[qIndex].questionState = 'answered';
    } // end if (questionState != 'answered') 
  } // end selectAnswer function
  
  $scope.isSelected = function(qIndex, aIndex) {
    return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
  }
  $scope.isCorrect = function(qIndex, aIndex) {
    return $scope.myQuestions[qIndex].correctAnswer === aIndex;
  }
  $scope.selectContinue = function() {
    return $scope.activeQuestion += 1;
  }

}]);
