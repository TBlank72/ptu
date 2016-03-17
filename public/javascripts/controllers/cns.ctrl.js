// cns.ctrl.js 
angular.module('ptuApp').controller('cnsCtrl', ['$scope', '$http', '$rootScope', '$q', '$window', function($scope, $http, $rootScope, $q, $window) {
  
  $scope.score = 0;
  $scope.activeQuestion = -1;
  $scope.activeQuestionAnswered = 0;
  $scope.percentage = 0;
  $scope.resultsMsg = ''; 
  
  // GET quiz data
  $http.get('json/cns_final.json').then(function(quizData){
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
      $scope.resultsMsg = "Sorry, you did not pass the CNS exam. Please review the\
                           study material and try again. After you submit your score\
                           below, you will receive 50% off the cost of your next attempt.";
    }
    else if ($scope.percentage >= 70) {
      $scope.resultsMsg = "Congratulations, you passed the CNS exam.  Please submit\
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
    $scope.percentage = (($scope.score / $scope.totalQuestions)*100).toFixed(2);
    return $scope.activeQuestion += 1;
  }


}]); //====== END CONTROLLER cnsCtrl ======

//
//
//
//
//
//
  /* old shar links ---maybe good twitter example
  //create Share Links
  $scope.createShareLinks = function(percentage) {
    var url = 'http://ptuniversity.com'
    // Search how to create a mail form and DO NOT use the mailto:
    var emailLink = '<a class="btn-quiz email" href="mailto:?subject=Try to beat my by score!&amp;body=I scored '+percentage+'% on my PT exam at '+url+'"> <i class="fa fa-envelope"></i> Email a friend</a>';

    var twitterLink = "<a class='btn-quiz twitter' href='http://twitter.com/share?text=I scored "+percentage+"% on my PT exam. Try to beat my score at&amp;hashtags=PTUniversity&amp;"+url+"'> <i class='fa fa-twitter'></i> Tweet your score</a>";
    var newMarkup = emailLink + twitterLink;

    return $sce.trustAsHtml(newMarkup);
  }*/

