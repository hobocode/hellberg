'use strict';

(function() {

  var QuestionSet = function(options) {
    if (typeof options === 'undefined' || options === null) {
      options = {};
    }

    var defaults = {
      questions: []
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

  QuestionSet.union = function() {

    var question_set = new QuestionSet();

    for (var i = 0; i < arguments.length; i++) {
      var set = arguments[i];

      for (var j = 0; j < set.questions.length; j++) {
        var question = set.questions[j];
        question_set.add(question);
      }
    }

    return question_set;
  };

  QuestionSet.prototype.questions = function() {
    return this.questions;
  };

  QuestionSet.prototype.get_question = function(idx) {
    return this.questions[idx];
  };

  QuestionSet.prototype.set_question = function(question, idx) {
    question.index = idx;
    this.questions[idx] = question;
  };

  QuestionSet.prototype.add = function(question) {

    if (question.index < 0) {
      question.index = this.questions.length;
      return this.questions.push(question);
    }

    return this.set_question(question, question.index);
  };


  var HB = window.Hellberg || {};
  HB.QuestionSet = QuestionSet;
  window.Hellberg = HB;

})();
