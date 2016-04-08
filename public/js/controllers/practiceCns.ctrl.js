// practicCns.ctrl.js 
angular.module('ptuApp').controller('practiceCnsCtrl', ['$scope', '$http', '$rootScope', '$q', '$window', function($scope, $http, $rootScope, $q, $window) {
  
  $scope.score = 0;
  $scope.activeQuestion = -1;
  $scope.activeQuestionAnswered = 0;
  $scope.percentage = 0;
  $scope.resultsMsg = ''; 
  
  // GET practice CNS quiz 1 data
  if (window.location.href.indexOf("cnspractice1") > -1) {
    $http.get('json/cns_Pexam1.json').then(function(quizData){
      $scope.myQuestions = quizData.data;
      $scope.totalQuestions = $scope.myQuestions.length;
    });
  }
  // GET practice CNS quiz 2 data
  else if (window.location.href.indexOf("cnspractice2") > -1) {
    $http.get('json/cns_Pexam2.json').then(function(quizData){
      $scope.myQuestions = quizData.data;
      $scope.totalQuestions = $scope.myQuestions.length;
    });
  }
  // GET practice CNS quiz 3 data
  else if (window.location.href.indexOf("cnspractice3") > -1) {
    $http.get('json/cns_Pexam3.json').then(function(quizData){
      $scope.myQuestions = quizData.data;
      $scope.totalQuestions = $scope.myQuestions.length;
    });
  }

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
      $scope.resultsMsg = "You're not quite ready. Study the CNS practice exams\
                           more before you take the certification exam.\
                           Remember, there is no penalty for taking the CNS\
                           certification exam more than once.  Only your\
                           highest score will remain on record.";
    }
    else if ($scope.percentage >= 70) {
      $scope.resultsMsg = "You did great! You're ready to take your CNS\
                           certification exam! Remember, only your highest\
                           score will remain on record, so it is okay if you\
                           need to take the CNS certification exam more than once.\
                           Good Luck!";
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


}]); //====== END CONTROLLER cnsCtrl ======

