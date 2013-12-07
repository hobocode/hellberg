'use strict';

var load_img = function($q, src) {
  var img = new Image();
  var dfd = $q.defer();

  img.onload = function(){
    dfd.resolve();
  };

  img.src = "http://maps.googleapis.com/maps/api/streetview?" + src;

  return dfd.promise;
};

angular.module('hellbergApp')
  .controller('TripCtrl', ['$scope', '$routeParams', '$q', '$timeout', 'Questions', function ($scope, $routeParams, $q, $timeout, Questions) {

    $scope.points = 10;

    $scope.question = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor orci porttitor enim ultricies semper. Nulla turpis nibh, eleifend et sapien sit amet, ullamcorper molestie nulla.";

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

      console.log("RES", res);
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

          var leg = route.legs[0];
          var totdist = leg.distance.value;

          var NBR_IMGS = 1000;
          var delta = totdist/NBR_IMGS;

          var totd = 0;

          var leg = route.legs[0];
          var steps = leg.steps;

          for (var idx in steps) {
            var step = steps[idx];
            for (var jdx in step.path) {
              var p = step.path[jdx];
              points.push(p);
            }
          }

          // increase/reduces number of points
          var newpoints;
          var dists = [];
          var headings = [];


          for (var idx = 1; idx < points.length; idx++) {
            var p0 = points[idx-1], p1 = points[idx];
            dists.push(google.maps.geometry.spherical.computeDistanceBetween(p0, p1));
            headings.push(google.maps.geometry.spherical.computeHeading(p0, p1));
          }

          console.log(dists);
          console.log(headings);

          var imgurls = [];

          for (var idx = 0; idx < points.length-1; idx++) {
            var heading = headings[idx];
            var point = points[idx];
            var lat = point.lat();
            var lng = point.lng();
            var imgurl = "size=600x300&location=" + lat + "," + lng + "&heading=" + heading + "&pitch=-0.76&sensor=false";
            imgurls.push(imgurl);
          }

          console.log(imgurls)

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
              idx++;
              if (idx < imgurls.length) {
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
