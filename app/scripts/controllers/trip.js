'use strict';

angular.module('hellbergApp')
  .controller('TripCtrl', ['$scope', '$routeParams', '$q', '$timeout', '$location', 'RouteLoader', 'Questions', 'Speak', 'Soundtrack', function ($scope, $routeParams, $q, $timeout, $location, RouteLoader, Questions, Speak, Soundtrack) {

    $scope.points = 10;
    $scope.loading = true;

    $scope.brake = function() {
      console.log("BRAKE");
    }

    RouteLoader.fetch($routeParams.dep_ref, $routeParams.dest_ref).then(function(res) {

      Questions.fetch(res[0].name, res[1].name, [{
        lng : res[0].geometry.location.lng(),
        lat : res[0].geometry.location.lat()
      }, {
        lng : res[1].geometry.location.lng(),
        lat : res[1].geometry.location.lat()
      }]).then(function(questions) {
        var hyperlapse;
        var NUMBER_OF_QUESTIONS = 5;
        var NPTS = 10; // number of points
        var TIME = 50; // total time in seconds
        var TIME_PER_QUESTION = TIME/NUMBER_OF_QUESTIONS;

        $scope.loader_progress = 0;
        $scope.loader_total = NPTS;


        var start = function() {
          var play, pause, loop;

          Soundtrack.play();

          $scope.$apply(function() {
            $scope.loading = false;
          });

          var trip_time = 0;
          var next_question_time = 0;
          var paused = false, question_idx = NUMBER_OF_QUESTIONS-1;

          $scope.show_input = false;
          $scope.show_result = false;


          $scope.submit = function() {
            var answer = $scope.answer;
            var question = questions.get_question(question_idx);
            var correct = question.validate_answer(answer);
            if (correct) {
              $location.path("/correct/" + $scope.current_score + "/" + answer + "/")
            } else {
              $scope.show_wrong = true;
              $scope.show_input = false;
              $timeout(function() {
                $scope.show_wrong = false;
                play();
              }, 3000);
            }
          };

          pause = function() {
            paused = true;
            hyperlapse.pause();
            $scope.show_input = true;
          };

          play = function() {
            paused = false;
            loop();
            hyperlapse.play();
            $scope.show_input = false;
          };

          $scope.current_score = 2*(NUMBER_OF_QUESTIONS+1);
          $scope.trip_progress = 0;
          $scope.question = "";

          $scope.brake = function() {
            if (paused) {
              play();
            } else {
              pause();
            }
          }

          var td = 50;
          loop = function() {
            $scope.trip_progress = (trip_time/1000)/TIME*td;

            if (trip_time >= next_question_time) {
              next_question_time += TIME*1000/NUMBER_OF_QUESTIONS;
              $scope.current_score -= 2;
              var text = questions.get_question(question_idx--).question;
              $scope.question = text;
              // Speak.speak(text);
            }

            trip_time += td;
            if (!paused && $scope.current_ >= 0) {
              $timeout(loop, td, true);
            } else {
              var answer = questions.get_question(0).answers[0];
              $location.path("/result/0/" + answer + "/")
            }
          };
          loop();
        }

        hyperlapse = new Hyperlapse(document.getElementById('pano'), {
          use_lookat: false,
          max_points: NPTS,
          elevation: 50,
          width: window.innerWidth,
          height: window.innerHeight,
          zoom: 1,
          millis : TIME/NPTS*1000
        });

        hyperlapse.onLoadProgress = function(e) {
          $scope.$apply(function() {
            $scope.loader_progress++;
          });
        };

        hyperlapse.onError = function(e) {
          $scope.$apply(function() {
            $scope.loader_progress++;
          });

          console.log(e);
        };

        hyperlapse.onRouteComplete = function(e) {
          hyperlapse.load();
        };

        hyperlapse.onLoadComplete = function(e) {
          hyperlapse.play();
          start();
        };

        hyperlapse.generate({route:res[2]});


      });


    });


  }]);
