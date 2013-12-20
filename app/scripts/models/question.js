'use strict';

(function() {
  var Question = function(options) {
    if (typeof options === 'undefined' || options === null) {
      options = {};
    }

    var defaults = {
      index: -1,
      question: null,
      answer: null,
      difficulty: 0.0
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

  Question.prototype.get_diffucilty = function() {

    var adjust = function( adj, min, max ) {
      if ( isNaN( min ) ) {
        min = -Infinity;
      }

      if ( isNaN( max ) ) {
        max = Infinity;
      }
      return adj < min ? min : adj > max ? max : adj;
    };

    return adjust(this.difficulty, 0.0, 0.99999999999999999);
  };

  Question.prototype.validate_answer = function(answer) {
    return this.answer.validate_answer(answer);
  };


  var HB = window.Hellberg || {};
  HB.Question = Question;
  window.Hellberg = HB;

})();
