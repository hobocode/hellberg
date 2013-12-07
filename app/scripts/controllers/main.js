'use strict';

angular.module('hellbergApp')
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.img_index = "0" + Math.floor(Math.round(Math.random() * 9));
    $scope.detail1 = "";
    $scope.detail2 = "";
    $scope.options = { types: '(cities)' };

    $scope.trip = function() {
      $location.path('/trip/' + $scope.detail1.reference + '/' + $scope.detail2.reference + '/');
    };

    $scope.random = function() {
      var trips = [
        [
          'CoQBcgAAALrzKujSCi9rSiQ9Wgrs-SBHmUnvrCq8QzsMxqQv4KusGzTLcAZ96ZqxSGATL2EIEr95P17nO1DG8wW-drh-2Ij6Wkkk_Jr9XuKximoKE0HCZuQ7O2nDY7IpgFxHsHzb4pBPmklDr8_Hc4uGeexxSmUi9ArM3enuvZirJ0yEOpSyEhDIu_10N0PU7-d49nYgH4k9GhQrKv2_LeI8KbfXQbRDRidkRFtf6g',
          'CoQBdgAAAJvNJN5K76_Oh2aJoSbpsNV8b_wLEhtbU3E4yg769Rb7Q7LwUTEJuqrEc_-UvNjMFw-rd8MWvFav0E6lUEjK6rzn_qeZgAAYxCzyEuunKg5qbW0Ha59eo8K7D9YlyUHYVqJS82_HX4snzG7nzBUvOzXvmWcDl6nKuk2T6MRYmoSdEhB0XMVZnhJsQHSOWKZnZjRGGhRc9iUByrDmgOubD_YHDbaEyUMOHA'
        ]
      ];

      var trip = trips[Math.floor(Math.random()*trips.length)];
      var el = Math.round(Math.random());
      $location.path('/trip/' + trip[el] + '/' + trip[1-el] + '/');
    }

  }]);
