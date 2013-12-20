'use strict';

angular.module('hellbergApp').factory('Questions', ['$http', '$q', 'LOCALE', 'Wikipedia', 'Foursquare', function($http, $q, LOCALE, Wikipedia, Foursquare) {
  var instance = {};


  instance.fetch = function(departure_name, destination_name, points) {

    var dep = new Hellberg.TripLocation({
      name: departure_name,
      coordinate: {
        lat: points.length ? points[0].lat : 0.0,
        lng: points.length ? points[0].lng : 0.0
      },
      type: Hellberg.TripLocation.prototype.LOCATION_TYPE_DEPARTURE
    });

    var dest = new Hellberg.TripLocation({
      name: destination_name,
      coordinate: {
        lat: points.length ? points[(points.length - 1)].lat : 0.0,
        lng: points.length ? points[(points.length - 1)].lng : 0.0
      },
      type: Hellberg.TripLocation.prototype.LOCATION_TYPE_DESTINATION
    });

    var answer = new Hellberg.Answer({
      answers: [
        dest.name
      ]
    });


    var wikidfd = $q.defer();
    Wikipedia.fetch(dep, dest, answer).then(function(question_set) {
      wikidfd.resolve(question_set);
    });

    var fsqdfd = $q.defer();
    Foursquare.fetch(dep, dest, answer).then(function(question_set) {
      fsqdfd.resolve(question_set);
    });


    var dfd = $q.defer();
    $q.all([wikidfd.promise, fsqdfd.promise]).then(function(res) {
      var question_set = new Hellberg.QuestionSet();

      var wikipedia_questions = res[0];
      var foursquare_questions = res[1];

      question_set = Hellberg.QuestionSet.union(wikipedia_questions, foursquare_questions);
      question_set = question_set.increasing_difficulty_set(5);

      dfd.resolve(question_set);
    });

    return dfd.promise;
  };

  return instance;
}]);
