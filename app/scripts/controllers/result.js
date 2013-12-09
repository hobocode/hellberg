'use strict';

angular.module('hellbergApp')
  .controller('ResultCtrl', ['$scope', '$location', '$routeParams', 'Soundtrack', function($scope, $location, $routeParams, Soundtrack) {
    $scope.score = $routeParams.score;
    $scope.answer = $routeParams.answer;

    Soundtrack.unduck();

    $scope.play = function() {
      Soundtrack.stop();
      $location.path('/');
    };
  }]);
