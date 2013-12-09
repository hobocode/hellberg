'use strict';

angular.module('hellbergApp')
  .controller('ResultCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    $scope.score = $routeParams.score;
    $scope.answer = $routeParams.answer;

    $scope.play = function() {
      $location.path("/");
    };
  }]);
