angular.module("ptuApp").controller("cmtCtrl",["$scope","$http","$rootScope","$q","$window",function($scope,$http,$rootScope,$q,$window){$scope.score=0;$scope.activeQuestion=-1;$scope.activeQuestionAnswered=0;$scope.percentage=0;$scope.resultsMsg="";$http.get("json/cmt_final.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length});$scope.selectAnswer=function(qIndex,aIndex){var questionState=$scope.myQuestions[qIndex].questionState;if(questionState!="answered"){$scope.myQuestions[qIndex].selectedAnswer=aIndex;var correctAnswer=$scope.myQuestions[qIndex].correct;$scope.myQuestions[qIndex].correctAnswer=correctAnswer;if(aIndex===correctAnswer){$scope.myQuestions[qIndex].correctness="correct";$scope.score+=1}else{$scope.myQuestions[qIndex].correctness="incorrect"}$scope.myQuestions[qIndex].questionState="answered"}$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);if($scope.percentage<70){$scope.resultsMsg="Sorry, you did not pass the CMT exam. Please review the                           study material and try again. There is no penalty for                           taking the exam multiple times. Only your highest score                           will remain on record."}else{if($scope.percentage>=70){$scope.resultsMsg="Congratulations, you passed the CMT exam. Please submit                           your score below to record your CMT score. You will                           see a link on your account page to checkout and receive                           your certification and verification ID for employers."}}};$scope.isSelected=function(qIndex,aIndex){return $scope.myQuestions[qIndex].selectedAnswer===aIndex};$scope.isCorrect=function(qIndex,aIndex){return $scope.myQuestions[qIndex].correctAnswer===aIndex};$scope.selectContinue=function(){$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);return $scope.activeQuestion+=1}}]);angular.module("ptuApp").controller("cnsCtrl",["$scope","$http","$rootScope","$q","$window",function($scope,$http,$rootScope,$q,$window){$scope.score=0;$scope.activeQuestion=-1;$scope.activeQuestionAnswered=0;$scope.percentage=0;$scope.resultsMsg="";$http.get("json/cns_final.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length});$scope.selectAnswer=function(qIndex,aIndex){var questionState=$scope.myQuestions[qIndex].questionState;if(questionState!="answered"){$scope.myQuestions[qIndex].selectedAnswer=aIndex;var correctAnswer=$scope.myQuestions[qIndex].correct;$scope.myQuestions[qIndex].correctAnswer=correctAnswer;if(aIndex===correctAnswer){$scope.myQuestions[qIndex].correctness="correct";$scope.score+=1}else{$scope.myQuestions[qIndex].correctness="incorrect"}$scope.myQuestions[qIndex].questionState="answered"}$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);if($scope.percentage<70){$scope.resultsMsg="Sorry, you did not pass the CNS exam. Please review the                           study material and try again. There is no penalty for                           taking the exam multiple times. Only your highest score                           will remain on record."}else{if($scope.percentage>=70){$scope.resultsMsg="Congratulations, you passed the CNS exam. Please submit                           your score below to record your CNS score. You will                           see a link on your account page to checkout and receive                           your certification and verification ID for employers."}}};$scope.isSelected=function(qIndex,aIndex){return $scope.myQuestions[qIndex].selectedAnswer===aIndex};$scope.isCorrect=function(qIndex,aIndex){return $scope.myQuestions[qIndex].correctAnswer===aIndex};$scope.selectContinue=function(){$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);return $scope.activeQuestion+=1}}]);angular.module("ptuApp").controller("cptCtrl",["$scope","$http","$rootScope","$q","$window",function($scope,$http,$rootScope,$q,$window){$scope.score=0;$scope.activeQuestion=-1;$scope.activeQuestionAnswered=0;$scope.percentage=0;$scope.resultsMsg="";$http.get("json/cpt_final.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length});$scope.selectAnswer=function(qIndex,aIndex){var questionState=$scope.myQuestions[qIndex].questionState;if(questionState!="answered"){$scope.myQuestions[qIndex].selectedAnswer=aIndex;var correctAnswer=$scope.myQuestions[qIndex].correct;$scope.myQuestions[qIndex].correctAnswer=correctAnswer;if(aIndex===correctAnswer){$scope.myQuestions[qIndex].correctness="correct";$scope.score+=1}else{$scope.myQuestions[qIndex].correctness="incorrect"}$scope.myQuestions[qIndex].questionState="answered"}$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);if($scope.percentage<70){$scope.resultsMsg="Sorry, you did not pass the CPT exam. Please review the                           study material and try again. There is no penalty for                           taking the exam multiple times. Only your highest score                           will remain on record."}else{if($scope.percentage>=70){$scope.resultsMsg="Congratulations, you passed the CPT exam. Please submit                           your score below to record your CPT score. You will                           see a link on your account page to checkout and receive                           your certification and verification ID for employers."}}};$scope.isSelected=function(qIndex,aIndex){return $scope.myQuestions[qIndex].selectedAnswer===aIndex};$scope.isCorrect=function(qIndex,aIndex){return $scope.myQuestions[qIndex].correctAnswer===aIndex};$scope.selectContinue=function(){$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);return $scope.activeQuestion+=1}}]);angular.module("ptuApp").controller("practiceCmtCtrl",["$scope","$http","$rootScope","$q","$window",function($scope,$http,$rootScope,$q,$window){$scope.score=0;$scope.activeQuestion=-1;$scope.activeQuestionAnswered=0;$scope.percentage=0;$scope.resultsMsg="";if(window.location.href.indexOf("cmtpractice1")>-1){$http.get("json/cmt_pexam1.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}else{if(window.location.href.indexOf("cmtpractice2")>-1){$http.get("json/cmt_pexam2.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}else{if(window.location.href.indexOf("cmtpractice3")>-1){$http.get("json/cmt_pexam3.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}}}$scope.selectAnswer=function(qIndex,aIndex){var questionState=$scope.myQuestions[qIndex].questionState;if(questionState!="answered"){$scope.myQuestions[qIndex].selectedAnswer=aIndex;var correctAnswer=$scope.myQuestions[qIndex].correct;$scope.myQuestions[qIndex].correctAnswer=correctAnswer;if(aIndex===correctAnswer){$scope.myQuestions[qIndex].correctness="correct";$scope.score+=1}else{$scope.myQuestions[qIndex].correctness="incorrect"}$scope.myQuestions[qIndex].questionState="answered"}$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);if($scope.percentage<70){$scope.resultsMsg="You're not quite ready. Study the CMT practice exams                           more before you take the certification exam.                           Remember, there is no penalty for taking the CMT                           certification exam more than once.  Only your                           highest score will remain on record."}else{if($scope.percentage>=70){$scope.resultsMsg="You did great! You're ready to take your CMT                           certification exam! Remember, only your highest                           score will remain on record, so it is okay if you                           need to take the CMT certification exam more than once.                           Good Luck!"}}};$scope.isSelected=function(qIndex,aIndex){return $scope.myQuestions[qIndex].selectedAnswer===aIndex};$scope.isCorrect=function(qIndex,aIndex){return $scope.myQuestions[qIndex].correctAnswer===aIndex};$scope.selectContinue=function(){$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);return $scope.activeQuestion+=1}}]);angular.module("ptuApp").controller("practiceCnsCtrl",["$scope","$http","$rootScope","$q","$window",function($scope,$http,$rootScope,$q,$window){$scope.score=0;$scope.activeQuestion=-1;$scope.activeQuestionAnswered=0;$scope.percentage=0;$scope.resultsMsg="";if(window.location.href.indexOf("cnspractice1")>-1){$http.get("json/cns_pexam1.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}else{if(window.location.href.indexOf("cnspractice2")>-1){$http.get("json/cns_pexam2.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}else{if(window.location.href.indexOf("cnspractice3")>-1){$http.get("json/cns_pexam3.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}}}$scope.selectAnswer=function(qIndex,aIndex){var questionState=$scope.myQuestions[qIndex].questionState;if(questionState!="answered"){$scope.myQuestions[qIndex].selectedAnswer=aIndex;var correctAnswer=$scope.myQuestions[qIndex].correct;$scope.myQuestions[qIndex].correctAnswer=correctAnswer;if(aIndex===correctAnswer){$scope.myQuestions[qIndex].correctness="correct";$scope.score+=1}else{$scope.myQuestions[qIndex].correctness="incorrect"}$scope.myQuestions[qIndex].questionState="answered"}$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);if($scope.percentage<70){$scope.resultsMsg="You're not quite ready. Study the CNS practice exams                           more before you take the certification exam.                           Remember, there is no penalty for taking the CNS                           certification exam more than once.  Only your                           highest score will remain on record."}else{if($scope.percentage>=70){$scope.resultsMsg="You did great! You're ready to take your CNS                           certification exam! Remember, only your highest                           score will remain on record, so it is okay if you                           need to take the CNS certification exam more than once.                           Good Luck!"}}};$scope.isSelected=function(qIndex,aIndex){return $scope.myQuestions[qIndex].selectedAnswer===aIndex};$scope.isCorrect=function(qIndex,aIndex){return $scope.myQuestions[qIndex].correctAnswer===aIndex};$scope.selectContinue=function(){$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);return $scope.activeQuestion+=1}}]);angular.module("ptuApp").controller("practiceCptCtrl",["$scope","$http","$rootScope","$q","$window",function($scope,$http,$rootScope,$q,$window){$scope.score=0;$scope.activeQuestion=-1;$scope.activeQuestionAnswered=0;$scope.percentage=0;$scope.resultsMsg="";if(window.location.href.indexOf("cptpractice1")>-1){$http.get("json/cpt_pexam1.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}else{if(window.location.href.indexOf("cptpractice2")>-1){$http.get("json/cpt_pexam2.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}else{if(window.location.href.indexOf("cptpractice3")>-1){$http.get("json/cpt_pexam3.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}}}$scope.selectAnswer=function(qIndex,aIndex){var questionState=$scope.myQuestions[qIndex].questionState;if(questionState!="answered"){$scope.myQuestions[qIndex].selectedAnswer=aIndex;var correctAnswer=$scope.myQuestions[qIndex].correct;$scope.myQuestions[qIndex].correctAnswer=correctAnswer;if(aIndex===correctAnswer){$scope.myQuestions[qIndex].correctness="correct";$scope.score+=1}else{$scope.myQuestions[qIndex].correctness="incorrect"}$scope.myQuestions[qIndex].questionState="answered"}$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);if($scope.percentage<70){$scope.resultsMsg="You're not quite ready. Study the CPT practice exams                           more before you take the certification exam.                           Remember, there is no penalty for taking the CPT                           certification exam more than once.  Only your                           highest score will remain on record."}else{if($scope.percentage>=70){$scope.resultsMsg="You did great! You're ready to take your CPT                           certification exam! Remember, only your highest                           score will remain on record, so it is okay if you                           need to take the CPT certification exam more than once.                           Good Luck!"}}};$scope.isSelected=function(qIndex,aIndex){return $scope.myQuestions[qIndex].selectedAnswer===aIndex};$scope.isCorrect=function(qIndex,aIndex){return $scope.myQuestions[qIndex].correctAnswer===aIndex};$scope.selectContinue=function(){$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);return $scope.activeQuestion+=1}}]);angular.module("ptuApp").controller("practiceTestCtrl",["$scope","$http","$rootScope","$q","$window",function($scope,$http,$rootScope,$q,$window){$scope.score=0;$scope.activeQuestion=-1;$scope.activeQuestionAnswered=0;$scope.percentage=0;$scope.resultsMsg="";if(window.location.href.indexOf("testpractice1")>-1){$http.get("json/test_exam.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}else{if(window.location.href.indexOf("testpractice2")>-1){$http.get("json/test_exam2.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}else{if(window.location.href.indexOf("testpractice3")>-1){$http.get("json/test_exam3.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length})}}}$scope.selectAnswer=function(qIndex,aIndex){var questionState=$scope.myQuestions[qIndex].questionState;if(questionState!="answered"){$scope.myQuestions[qIndex].selectedAnswer=aIndex;var correctAnswer=$scope.myQuestions[qIndex].correct;$scope.myQuestions[qIndex].correctAnswer=correctAnswer;if(aIndex===correctAnswer){$scope.myQuestions[qIndex].correctness="correct";$scope.score+=1}else{$scope.myQuestions[qIndex].correctness="incorrect"}$scope.myQuestions[qIndex].questionState="answered"}$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);if($scope.percentage<70){$scope.resultsMsg="You're not quite ready. Study the practice exams                           more before you take the certification exam.                           Remember, there is no penalty for taking the                           certification exam more than once.  Only your                           highest score will remain on record."}else{if($scope.percentage>=70){$scope.resultsMsg="You did great! You're ready to take your                           certification exam! Remember, only your highest                           score will remain on record, so it is okay if you                           need to take the certification exam more than once.                           Good Luck!"}}};$scope.isSelected=function(qIndex,aIndex){return $scope.myQuestions[qIndex].selectedAnswer===aIndex};$scope.isCorrect=function(qIndex,aIndex){return $scope.myQuestions[qIndex].correctAnswer===aIndex};$scope.selectContinue=function(){$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);return $scope.activeQuestion+=1}}]);angular.module("ptuApp").controller("testCtrl",["$scope","$http","$rootScope","$q","$window",function($scope,$http,$rootScope,$q,$window){$scope.score=0;$scope.activeQuestion=-1;$scope.activeQuestionAnswered=0;$scope.percentage=0;$scope.resultsMsg="";$http.get("json/test_exam.json").then(function(quizData){$scope.myQuestions=quizData.data;$scope.totalQuestions=$scope.myQuestions.length});$scope.selectAnswer=function(qIndex,aIndex){var questionState=$scope.myQuestions[qIndex].questionState;if(questionState!="answered"){$scope.myQuestions[qIndex].selectedAnswer=aIndex;var correctAnswer=$scope.myQuestions[qIndex].correct;$scope.myQuestions[qIndex].correctAnswer=correctAnswer;if(aIndex===correctAnswer){$scope.myQuestions[qIndex].correctness="correct";$scope.score+=1}else{$scope.myQuestions[qIndex].correctness="incorrect"}$scope.myQuestions[qIndex].questionState="answered"}$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);if($scope.percentage<70){$scope.resultsMsg="Sorry, you did not pass the TEST exam. Please review the                           study material and try again. There is no penalty for                           taking the exam multiple times. Only your highest score                           will remain on record."}else{if($scope.percentage>=70){$scope.resultsMsg="Congratulations, you passed the TEST exam. Please submit                           your score below to record your TEST score. You will                           see a link on your account page to checkout and receive                           your certification and verification ID for employers."}}};$scope.isSelected=function(qIndex,aIndex){return $scope.myQuestions[qIndex].selectedAnswer===aIndex};$scope.isCorrect=function(qIndex,aIndex){return $scope.myQuestions[qIndex].correctAnswer===aIndex};$scope.selectContinue=function(){$scope.percentage=(($scope.score/$scope.totalQuestions)*100).toFixed(2);return $scope.activeQuestion+=1}}]);