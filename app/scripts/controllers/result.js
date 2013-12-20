'use strict';

angular.module('hellbergApp')
  .controller('ResultCtrl', ['$scope', '$location', 'State', 'Soundtrack', 'GLOBALS',
  function($scope, $location, State, Soundtrack, GLOBALS) {
    if (GLOBALS.debug) {
      State.score = 0;
      State.dest = {
        'answer' : 'Berlin'
      };
    } else if (!State.dep) {
      $location.path('/');
    }

    $scope.score = State.score;
    $scope.answer = State.dest.name;

    Soundtrack.unduck();

    $scope.play = function() {
      Soundtrack.stop();
      $location.path('/');
    };
  }]);
