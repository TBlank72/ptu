// test.ctrl.js 
angular.module('ptuApp').controller('testCtrl', ['$scope', '$http', '$rootScope', '$q', '$window', function($scope, $http, $rootScope, $q, $window) {
  
  $scope.score = 0;
  $scope.activeQuestion = -1;
  $scope.activeQuestionAnswered = 0;
  $scope.percentage = 0;
  $scope.resultsMsg = ''; 
  
  // GET quiz data
  $http.get('json/test_exam.json').then(function(quizData){
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
      $scope.resultsMsg = "Sorry, you did not pass the TEST exam. Please review the\
                           study material and try again. There is no penalty for\
                           taking the exam multiple times. Only your highest score\
                           will remain on record.";
    }
    else if ($scope.percentage >= 70) {
      $scope.resultsMsg = "Congratulations, you passed the TEST exam. Please submit\
                           your score below to record your TEST score. You will\
                           see a link on your account page to checkout and receive\
                           your certification and verification ID for employers.";
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
    $scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(2);
    return $scope.activeQuestion += 1;
  }


}]); //====== END CONTROLLER testCtrl ======

