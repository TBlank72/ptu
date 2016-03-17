// cmt.ctrl.js 
console.log('cmtCtrl loaded');

angular.module('ptuApp').controller('cmtCtrl', ['$scope', '$http', '$rootScope', '$sce', '$window', 'AuthService', function($scope, $http, $rootScope, $sce, $window, AuthService) {
  
  $scope.score = 0;
  $scope.activeQuestion = -1;
  $scope.activeQuestionAnswered = 0;
  $scope.percentage = 0; 
  $scope.resultsMsg = '';
  
  $http.get('json/cmt_final.json').then(function(quizData){
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
    
    // Results panel
    $scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(2);
    if ($scope.percentage < 70) {
      $scope.resultsMsg = "Sorry, you did not pass the CMT exam. Please review the\
                           study material and try again. After you submit your score\
                           below, you will receive 50% off the cost of your next attempt.";
    }
    else if ($scope.percentage >= 70) {
      $scope.resultsMsg = "Congratulations, you passed the CMT exam.  Please submit\
                           your score below to receive your certificate and\
                           verfification ID!";
    }

  } // end selectAnswer function

  //highlight the user selected answer
  $scope.isSelected = function(qIndex, aIndex) {
    return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
  }
  //highlight correct answer
  $scope.isCorrect = function(qIndex, aIndex) {
    return $scope.myQuestions[qIndex].correctAnswer === aIndex;
  }
  //increment activeQuestion
  $scope.selectContinue = function() {
    return $scope.activeQuestion += 1;
  }

}]);

