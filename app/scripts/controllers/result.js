'use strict';

angular.module('hellbergApp')
  .controller('ResultCtrl', ['$scope', '$location', 'State', 'Soundtrack', function($scope, $location, State, Soundtrack) {
    $scope.score = State.score;
    $scope.answer = State.dest.name;

    Soundtrack.unduck();

    $scope.play = function() {
      Soundtrack.stop();
      $location.path('/');
    };
  }]);
