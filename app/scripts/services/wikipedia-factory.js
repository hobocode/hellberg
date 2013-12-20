'use strict';

angular.module('hellbergApp').factory('Wikipedia', ['$http', '$q', 'LOCALE', function($http, $q, LOCALE) {
  var instance = {};

  var get_wikipedia_page = function(search_term) {
    var url = 'http://' + LOCALE.lang + '.wikipedia.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK&prop=revisions&rvprop=content&titles=' + encodeURIComponent(search_term);
    return $http.jsonp(url);
  };

  instance.fetch = function(departure, destination, answer) {

    var question_set = new Hellberg.QuestionSet();

    var apidfd = $q.defer();

    var parse_wikipedia_page = function(response) {
      var data = response.data;
      var sentence_min_length = 25;
      var pattern =  /^#redirect\s+\[\[([^\]]+)\]\]/gim; // new RegExp(/(^#redirect\s+\[\[([^\]]+)\]\])/gim);

      for (var pid in data.query.pages) {
        var page = data.query.pages[pid];
        var revision = page.revisions.pop();

        var content = revision['*'];

        var matches = pattern.exec(content);
        var destname = false;

        if (matches && matches.length > 1) {
          destname = matches.pop();
          answer.add_answer(destname);
        }

        if (destname !== false) {
          return {
            'type' : 'redirect',
            'name' : destname
          };

        } else {
          // console.log(content); // #redirect [[Vienna]] <= Detta vill vi ha

          content = txtwiki.parseWikitext(content);
          // refractor into library - ugly-regex.js :D LOL

          content = content.replace(/^[  \s]*\|.*$/gi, '');         // Remove all lines beginning with |
          content = content.replace(/[\s\n]+/gi, ' ');              // Remove all whitespave
          content = content.replace(/\{\{[^\}]*\}\}/gi, '');      // Remove all {{ tags }}
          content = content.replace(/\([^\)]*[;][^\)]*\)/gi, '');     // Remove junk parahteses, such as ( ; )
          content = content.replace(/([=]+[^=]+[=]+)/gi, '');     // Remove === Headings ===

          content = content.replace(/[\s\n]+/gi, ' ');                                    // Remove all whitespave
          content = $('<div />').html(content).text();                                    // Remove all HTML entities

          content = content.replace(/%/gi, '%%');                                   // Escape any % char

          content = content.replace(new RegExp(answer.answers.join('|'), 'gi'), '%s');       // Replace all instances of city name with %s
          content = content.replace(/\s+,\s+/gi, ', ');                       // Fix commas

          var boundary = '#####';

          content = content.replace(/([\.\?!])\s+/gi, '$1' + boundary);
          var sentences = content.split(boundary);

          for (var i = 0; i < sentences.length; i++) {
            var sentence = sentences[i];

            var difficulty = i / (sentences.length - 1);

            if (sentence.match(/%s/gi) && sentence.length > sentence_min_length) {

              var template = new Hellberg.FactQuestionTemplate({
                format: sentence.replace(/^\s+/gi, ''),
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

          return {
            'type' : 'questions',
            'questions' : question_set
          };

        }
      }
    };


    // var wikipedia_questions = [];
    get_wikipedia_page(destination.name).then(function(response) {
      var res = parse_wikipedia_page(response);
      if (res.type === 'redirect') {
        get_wikipedia_page(res.name).then(function(response) {
          var res = parse_wikipedia_page(response);
          console.log('apidfd.resolve');

          apidfd.resolve(res);
        });
      } else {
        // res['type'] == 'questions'
        console.log('apidfd.resolve');
        apidfd.resolve(res.questions);
      }

      apidfd.resolve(question_set);
    }, function(error) {
      apidfd.reject(error);
    }, function(notification) {
      console.log('Notification:', notification);
    });

    return apidfd.promise;
  };

  return instance;
}]);
