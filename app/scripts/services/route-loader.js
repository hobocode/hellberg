
angular.module('hellbergApp').factory('RouteLoader', ['$q', function($q) {
  var instance = {}

  instance.load = function(dep_ref, dest_ref) {

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

  return instance;
}]);
