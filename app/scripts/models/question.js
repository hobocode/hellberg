'use strict';

(function() {
  var Question = function(options) {
    if (typeof options === 'undefined' || options === null) {
      options = {};
    }

    var defaults = {
      index: -1,
      question: null,
      answer: null
    };

    for (var key in defaults) {
      var value = null;
      if (key in options) {
        value = options[key];
      } else {
        value = defaults[key];
      }

      this[key] = value;
    }
  };

  // Question.prototype.score = function() {
  //   return (this.index + 1) * 2;
  // };

  Question.prototype.validate_answer = function(answer) {
    return this.answer.validate_answer(answer);
  };


  var ImageQuestion = function(options) {

    if (typeof options === 'undefined' || options === null) {
      options = {};
    }

    Question.call(this, options);

    var defaults = {
      image: null
    };

    for (var key in defaults) {
      var value = null;
      if (key in options) {
        value = options[key];
      } else {
        value = defaults[key];
      }

      this[key] = value;
    }
  };
  ImageQuestion.prototype = new Question();
  ImageQuestion.prototype.constructor = Question;


  var HB = window.Hellberg || {};
  HB.Question = Question;
  HB.ImageQuestion = ImageQuestion;
  window.Hellberg = HB;

})();
