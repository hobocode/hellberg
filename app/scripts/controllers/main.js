'use strict';

angular.module('hellbergApp')
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.img_index = "0" + Math.floor(Math.round(Math.random() * 9));
    $scope.detail1 = "";
    $scope.detail2 = "";

    $scope.trip = function() {
      $location.path('/trip/' + $scope.detail1.reference + '/' + $scope.detail2.reference + '/');
    };

  }]);
