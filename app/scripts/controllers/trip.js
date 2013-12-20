'use strict';

angular.module('hellbergApp')
  .controller('TripCtrl', ['$scope', '$routeParams', '$q', '$timeout', '$location', 'RouteLoader', 'Questions', 'Speak', 'Soundtrack',
    function ($scope, $routeParams, $q, $timeout, $location, RouteLoader, Questions, Speak, Soundtrack)
{
  var start, pause, play, loop;

  var NQUESTIONS = 5; // number of questions
  var NPTS = 200; // number of points
  var TIME = 50; // total time in seconds
  var trip_time = 0;
  var next_question_time = 0;
  var questions;
  var question_idx = NQUESTIONS-1;

  $scope.points = NPTS;
  $scope.loading = true;
  $scope.indeterminate = true;

  $scope.loader_progress = 0;
  $scope.loader_total = NPTS;

  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;

  $scope.routeComplete = function() {
    $scope.$apply(function() {
      $scope.indeterminate = false;
    });
  }

  $scope.progress = function() {
    $scope.$apply(function() {
      $scope.loader_progress = $scope.loader_progress+1;
    });
  }

  pause = function() {
    $scope.paused = true;
    $scope.show_input = true;
  };

  play = function() {
    $scope.paused = false;
    $scope.show_input = false;
    loop();
  };

  $scope.brake = function() {
    if ($scope.paused) {
      play();
    } else {
      pause();
    }
    $('.brake').addClass('pull');
    $timeout(function() {
      $('.brake').removeClass('pull');
    }, 100);
  };

  $scope.submit = function() {
    var answer = $scope.answer;
    var question = questions.get_question(question_idx);
    var correct = question.validate_answer(answer);
    $scope.paused = true;
    if (correct) {
      $location.path('/result/' + $scope.current_score + '/' + question.answer.answers[0] + '/');
    } else {
      $scope.show_wrong = true;
      $scope.show_input = false;
      $timeout(function() {
        $scope.show_wrong = false;
        $scope.answer = '';
        play();
      }, 2000);
    }
  };


  var td = 50;
  loop = function() {
    $scope.trip_progress = (trip_time/1000)/TIME*td*2;

    trip_time += td;

    if (trip_time >= next_question_time) {
      next_question_time += TIME*1000/NQUESTIONS;
      $scope.current_score -= 2;

      if ($scope.current_score <= 0) {
        var answer = questions.questions[0].answer.answers[0];
        $location.path('/result/0/' + answer + '/');
      } else {
        var text = questions.get_question(question_idx--).question;
        $scope.question = text;
        // Speak.speak(text);
      }
    }

    if (!$scope.paused && $scope.current_score > 0) {
      $timeout(loop, td, true);
    }

  };

  $scope.start = function() {
    Soundtrack.play();
    $scope.loading = false;

    $scope.paused = false;

    $scope.show_input = false;
    $scope.show_result = false;

    $scope.current_score = 2*(NQUESTIONS+1);
    $scope.trip_progress = 0;
    $scope.question = '';

    loop();
  };


  RouteLoader.fetch($routeParams.dep_ref, $routeParams.dest_ref).then(function(res) {

    Questions.fetch(res[0].name, res[1].name, [{
      lng : res[0].geometry.location.lng(),
      lat : res[0].geometry.location.lat()
    }, {
      lng : res[1].geometry.location.lng(),
      lat : res[1].geometry.location.lat()
    }]).then(function(qobj) {
      questions = qobj;
      $scope.route = res[2];
    });

  });

}]);
