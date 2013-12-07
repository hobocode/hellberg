'use strict';

angular.module('hellbergApp')
  .controller('TripCtrl', ['$scope', '$routeParams', '$q', '$timeout', 'RouteLoader', 'Questions', function ($scope, $routeParams, $q, $timeout, RouteLoader, Questions) {

    $scope.points = 10;

    $scope.question = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor orci porttitor enim ultricies semper. Nulla turpis nibh, eleifend et sapien sit amet, ullamcorper molestie nulla.";

    $scope.loading = true;

    RouteLoader.fetch($routeParams.dep_ref, $routeParams.dest_ref).then(function(res) {
      Questions.fetch(res[0], res[1], [])
/*
      function(questions) {

        var NUMBER_OF_QUESTIONS = 5;
        var NPTS = 10; // number of points
        var TIME = 50; // total time in seconds
        var TIME_PER_QUESTION = TIME/NUMBER_OF_QUESTIONS;

        $scope.loader_progress = 0;
        $scope.loader_total = NPTS;

        var hyperlapse = new Hyperlapse(document.getElementById('pano'), {
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
          $scope.$apply(function() {
            $scope.loading = false;
          });
        };

        hyperlapse.generate({route:res[2]});

        $scope.current_score = 2*NUMBER_OF_QUESTIONS;
        var trip_time = 0;
        var next_question_time = 0;

        $scope.current_score = 2*(NUMBER_OF_QUESTIONS+1);

        $scope.trip_progress = 0;
        var loop = function() {
          $scope.trip_progress = (trip_time/1000)/TIME*100;
          $timeout(loop, 100, true);
          if (trip_time >= next_question_time) {
            next_question_time += TIME*1000/NUMBER_OF_QUESTIONS;
            $scope.current_score -= 2;
          }

          trip_time += 100;
        };
        loop();

      });
*/

    });


  }]);
