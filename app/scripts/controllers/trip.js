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
  .controller('TripCtrl', ['$scope', '$routeParams', '$q', '$timeout', 'Questions', function ($scope, $routeParams, $q, $timeout, Questions) {

    var dfd1 = $q.defer();

    var service = new google.maps.places.PlacesService($("#attribution")[0]);
    service.getDetails({ reference: $routeParams.place1 }, function(res) {
      dfd1.resolve(res);
    });

    var dfd2 = $q.defer();
    service.getDetails({ reference: $routeParams.place2 }, function(res) {
      dfd2.resolve(res);
    });

    $q.all([dfd1.promise, dfd2.promise]).then(function(res) {

      var questions = Questions.fetch(res[0].name, res[1].name, []);

      var directionsService = new google.maps.DirectionsService();

      var request = {
        origin: res[0].name,
        destination: res[1].name,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, function(result, status) {
        var points = [];

        if (status == google.maps.DirectionsStatus.OK) {
          var route = result.routes[0];
          var steps = route.legs[0].steps;
          for (var idx in steps) {
            var step = steps[idx];
            console.log(step);
            points.push(step.start_point);
            points.push(step.end_point);
          }

          var imgurls = [];

          for (var imgidx in points) {
            var point = points[imgidx];
            var lat = point.lat();
            var lng = point.lng();
            var imgurl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + lat + "," + lng + "&heading=151.78&pitch=-0.76&sensor=false";
            imgurls.push(imgurl);
          }

          var imgdfds = [];
          for (var imgidx in imgurls) {
            var url = imgurls[imgidx];
            imgdfds.push(load_img($q, url));
          }
          console.log(imgdfds);
          $q.all(imgdfds).then(function() {
            var idx = 0;
            var stop;
            var func = function() {
              $scope.img_url = imgurls[idx];
              console.log("hej");
              idx++;
              if (idx >= idx) {
                stop = $timeout(func, 100);
              }
            };
            stop = $timeout(func, 100);
          });
        } else {
          // [todo] - error
        }
      });
    });

  }]);
