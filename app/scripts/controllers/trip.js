'use strict';

angular.module('hellbergApp')
  .controller('TripCtrl', ['$scope', '$q', '$timeout', '$location', '$routeParams', 'State', 'RouteLoader', 'Questions', 'Speak', 'Soundtrack', 'GLOBALS',
    function ($scope, $q, $timeout, $location, $routeParams, State, RouteLoader, Questions, Speak, Soundtrack, GLOBALS)
{
  var pause, play, loop;

  // no need to start from beginning if GLOBALS.debug is true
  if (GLOBALS.debug && $routeParams.dep_ref) {
    State.dep_ref = $routeParams.dep_ref;
    State.dest_ref = $routeParams.dest_ref;
  } else if (!State.dep_ref) {
    $location.path('/');
  }

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
  };

  $scope.progress = function() {
    $scope.$apply(function() {
      $scope.loader_progress = $scope.loader_progress+1;
    });
  };

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
      State.score = $scope.current_score;
      $location.path('/result/');
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
        State.score = $scope.current_score;
        $location.path('/result/');
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

  RouteLoader.fetch(State.dep_ref, State.dest_ref).then(function(res) {
    var dest, dep, destloc, deploc;
    dep = res[0];
    dest = res[1];
    deploc = dep.geometry.location;
    destloc = dest.geometry.location;

    State.dep = dep;
    State.dest = dest;

    Questions.fetch(dep.name, dest.name, [{
      lng : deploc.lng(),
      lat : destloc.lat()
    }, {
      lng : destloc.lng(),
      lat : destloc.lat()
    }]).then(function(qobj) {
      questions = qobj;

      State.route = res[2];
      $scope.route = res[2];
    });

  });

}]);
