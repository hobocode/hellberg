
angular.module('hellbergApp').factory('RouteLoader', ['$q', function($q) {
  var instance = {}

  var fetch_details = function(dep_ref, dest_ref) {

    var dfd1 = $q.defer();

    var service = new google.maps.places.PlacesService($("#attribution")[0]);
    service.getDetails({ reference: dep_ref }, function(res) {
      dfd1.resolve(res);
    });

    var dfd2 = $q.defer();
    service.getDetails({ reference: dest_ref }, function(res) {
      dfd2.resolve(res);
    });

    return $q.all([dfd1.promise, dfd2.promise]);
  };

  var fetch_route = function(dep_name, dest_name) {

    var request = {
      origin: dep_name,
      destination: dest_name,
      travelMode: google.maps.TravelMode.DRIVING
    };

    var dfd = $q.defer();

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(result, status) {
      var points = [];

      if (status == google.maps.DirectionsStatus.OK) {
        var route = result.routes[0];
        dfd.resolve(route);
      } else {
        // [todo] - error
      }
    });

    return dfd.promise;
  }

  instance.fetch = function(dep_ref, dest_ref) {
    var dfd = $q.defer();

    fetch_details(dep_ref, dest_ref).then(function(res) {
      var name1 = res[0].name;
      var name2 = res[1].name;
      fetch_route(name1, name2).then(function(res) {
        dfd.resolve([name1, name2, res]);
      });
    });

    return dfd.promise;
  };

  return instance;
}]);
