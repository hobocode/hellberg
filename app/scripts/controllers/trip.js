'use strict';

angular.module('hellbergApp')
  .controller('TripCtrl', ['$scope', '$routeParams', '$q', '$timeout', 'RouteLoader', 'Questions', 'Speak', 'Soundtrack', function ($scope, $routeParams, $q, $timeout, RouteLoader, Questions, Speak, Soundtrack) {

    $scope.points = 10;
    $scope.loading = true;

    $scope.brake = function() {
      console.log("BRAKE");
    }

    RouteLoader.fetch($routeParams.dep_ref, $routeParams.dest_ref).then(function(res) {
      console.log(res);
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
          $scope.$apply(function() {
            $scope.loading = false;
          });

          Soundtrack.play();

          var trip_time = 0;
          var next_question_time = 0;
          var paused = false, question_idx = 0;

          var pause = function() {
            paused = true;
            hyperlapse.pause();
          };

          var play = function() {
            hyperlapse.play();
          }

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

          var loop = function() {
            $scope.trip_progress = (trip_time/1000)/TIME*100;

            if (trip_time >= next_question_time) {
              next_question_time += TIME*1000/NUMBER_OF_QUESTIONS;
              $scope.current_score -= 2;
              var text = questions.getQuestion(question_idx++).question;
              $scope.question = text;
              Speak.speak(text);
            }

            trip_time += 100;
            if (!paused) {
              $timeout(loop, 100, true);
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
