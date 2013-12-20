'use strict';

angular.module('hellbergApp').factory('Foursquare', ['$http', '$q', function($http, $q) {
  var instance = {};

  var API_CLIENT_ID = 'MURHMAGAPKW5ZAXYEEPFC30BALAU0D4CZYLRRWOMEKIDLV2C';
  var API_CLIENT_SECRET = 'TI0FW2KG2NPVFP20TSMIBSYALQJ4XM0I2WFMBXB3JTXPJMHU';

  var get_foursquare_venues = function(coords) {
    var url = 'https://api.foursquare.com/v2/venues/explore?ll=' + encodeURIComponent(coords.lat) + ',' + encodeURIComponent(coords.lng) + '&v=20131207&callback=JSON_CALLBACK';

    url += '&client_id=' + encodeURIComponent(API_CLIENT_ID);
    url += '&client_secret=' + encodeURIComponent(API_CLIENT_SECRET);

    return $http.jsonp(url);
  };

  instance.fetch = function(departure, destination, answer) {

    var question_set = new Hellberg.QuestionSet();

    var apidfd = $q.defer();

    var map_difficulty = function(value, min, max) {
      return value * (max - min) + min;
    };

    get_foursquare_venues(destination.coordinate).then(function(response) {

      var venues = response.data.response.groups[0].items;

      for (var idx = 0; idx < venues.length; idx++) {
        var venue_data = venues[idx];

        var name = venue_data.venue.name;
        var category = venue_data.venue.categories[0].name;

        var difficulty = map_difficulty(idx / venues.length, 0.2, 0.8);

        var lname = name.toLowerCase();
        for (var i = answer.answers.length - 1; i >= 0; i--) {
          var a = answer.answers[i].toLowerCase();
          if (lname.indexOf(a) !== -1) {
            difficulty = 0.0;
          }
        }

        if (answer.validate_answer(name) !== true) {
          var template = new Hellberg.VenueQuestionTemplate({
            name: name,
            category: category,
            location: destination
          });

          var question = new Hellberg.Question({
            question: template.question(),
            answer: answer,
            difficulty: difficulty
          });

          question_set.add(question);
        }
      }

      console.log('apidfd.resolve');
      apidfd.resolve(question_set);

    }, function(error) {
      apidfd.reject(error);
    }, function(notification) {
      console.log(notification);
    });

    return apidfd.promise;
  };

  return instance;
}]);
