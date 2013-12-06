'use strict';

angular.module('hellbergApp')
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.detail1 = "";
    $scope.detail2 = "";

    $scope.trip = function() {
      console.log("hej", $scope.detail1);
      $location.path('/trip/' + $scope.detail1.id + '/' + $scope.detail2.id + '/');
    };

  }]);
