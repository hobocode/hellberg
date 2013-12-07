'use strict';

var load_img = function($q, src) {
  var img = new Image();
  var dfd = $q.defer();

  img.onload = function(){
    dfd.resolve();
  };

  img.src = src;

  return dfd.promise;
};

angular.module('hellbergApp')
  .controller('TripCtrl', ['$scope', '$routeParams', '$q', '$timeout', 'RouteLoader', 'Questions', function ($scope, $routeParams, $q, $timeout, RouteLoader, Questions) {

    $scope.points = 10;

    $scope.question = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor orci porttitor enim ultricies semper. Nulla turpis nibh, eleifend et sapien sit amet, ullamcorper molestie nulla.";

    var dfd = RouteLoader.fetch($routeParams.dep_ref, $routeParams.dest_ref).then(function(res) {
      Questions.load(res[0], res[1], []);
    });


  }]);
