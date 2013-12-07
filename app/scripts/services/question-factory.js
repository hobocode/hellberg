
var app = angular.module('hellbergApp').factory('Questions', ['$http', 'LOCALE', function($http, LOCALE) {
  var instance = {
    departure_name: null,
    destination_name: null,
    points: []
  }

  var FOURSQUARE_API_ACCESS_TOKEN = "SL5IPGO1JG5XW1NU0QT1BQY1ESDO1HI13HXSS5EBRKFP1DXS";
  var FOURSQUARE_API_CLIENT_ID = "MURHMAGAPKW5ZAXYEEPFC30BALAU0D4CZYLRRWOMEKIDLV2C";
  var FOURSQUARE_API_CLIENT_SECRET = "TI0FW2KG2NPVFP20TSMIBSYALQJ4XM0I2WFMBXB3JTXPJMHU";

  var get_question = function(idx) {

  };

  var get_wikipedia_page = function(search_term, callback) {

    var url = "http://" + LOCALE.lang + ".wikipedia.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=revisions&rvprop=content&titles=" + encodeURIComponent(search_term);
    load_url(url, callback);
  };

  var get_foursquare_venues = function(coords, callback) {
    var url = "http://api.foursquare.com/v2/venues/explore?ll=" + encodeURIComponent(coords.lat) + "," + encodeURIComponent(coords.lng) + "&v=20131207&callback=JSON_CALLBACK";

    // Userless request
    url += "&client_id=" + encodeURIComponent(FOURSQUARE_API_CLIENT_ID);
    url += "&client_secret=" + encodeURIComponent(FOURSQUARE_API_CLIENT_SECRET);

    // Use(r)ful request? PUN INTENDED LOL
    // url += "&oauth_token=" + encodeURIComponent(FOURSQUARE_API_ACCESS_TOKEN);

    load_url(url, callback);
  };

  var load_url = function(url, callback) {
    $http.jsonp(url).
      success(function(data, status, headers, config) {
        // console.log("HTTP success:", data, status, headers, config);

        callback(data);
      }).
      error(function(data, status, headers, config) {
        console.log("HTTP Error:", data, status, headers, config);
      });
  };

  instance.fetch = function(departure_name, destination_name, points) {

    instance.departure_name = departure_name;
    instance.destination_name = destination_name;
    instance.points = points;

    // if (points.length < 1) {
    //   return false;
    // }

    // var dep = new Hellberg.TripLocation({
    //   name: departure_name,
    //   coordinate: {
    //     lat: points[0].lat,
    //     lng: points[0].lng
    //   }
    // });

    // var dest = new Hellberg.TripLocation({
    //   name: destination_name,
    //   coordinate: {
    //     lat: points[(points.length - 1)].lat,
    //     lng: points[(points.length - 1)].lng
    //   }
    // });


    var answer = new Hellberg.Answer({
      answers: [
        departure_name
      ]
    });

    var questions = [];

    var wikipedia_questions = [];
    get_wikipedia_page(departure_name, function(data) {

      var get_wikipedia_page_content = function(response) {
        for (pid in response.query.pages) {
          var page = response.query.pages[pid];
          var revision = page.revisions.pop();

          var content = revision['*'];
          content = txtwiki.parseWikitext(content);

          content = content.replace(/^[  \s]*\|.*$/gi, '');         // Remove all lines beginning with |
          content = content.replace(/[\s\n]+/gi, ' ');              // Remove all whitespave
          content = content.replace(/\{\{[^\}]*\}\}/gi, '');      // Remove all {{ tags }}
          content = content.replace(/\([^A-Za-z0-9]*\)/gi, '');     // Remove junk parahteses, such as ( ; )
          content = content.replace(/([=]+[^=]+[=]+)/gi, '');     // Remove === Headings ===

          content = content.replace(/[\s\n]+/gi, ' ');                                    // Remove all whitespave
          content = content.replace(new RegExp(departure_name, 'gi'), '%s');       // Replace all instances of city name with %s

          var boundary = "#####";

          content = content.replace(/([\.\?!])\s+/gi, '$1' + boundary);
          var sentences = content.split(boundary);
          var questions = [];

          for (var idx in sentences) {

            var sentence = sentences[idx];
            if (sentence.match, '%s') {
              var question = new FactQuestionTemplate({
                format: sentence.replace(/^\s+/gi, '')
              });
              questions.push(question);
            }
          }

          return questions;
        }
      };

      questions.push.apply(get_wikipedia_page_content(data));
    });


    var foursquare_locations = [];
    get_foursquare_venues({lat: 55.5833, lng: 13.0333}, function(data) {

      var venues = data.response.groups[0].items;

      for (var idx in venues) {
        var venue_data = venues[idx];

        var name = venue_data.venue.name;
        var category = venue_data.venue.categories[0].shortName;

        foursquare_locations.push({
          name: name,
          category: category
        });

        var template = new Hellberg.VenueQuestionTemplate({
          name: name,
          category: category
        });

        var question = new Hellberg.Question({
          question: template.question(),
          answer: answer
        });

        questions.push(question);
      }
    });

    var question_set = new Hellberg.QuestionSet();

    for (var idx = 0; idx < 5; idx++) {
      question_set.add(questions[idx]);
    }

    return question_set;
  };

  return instance;
}]);
