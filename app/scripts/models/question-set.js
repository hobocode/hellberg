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

  QuestionSet.prototype.increasing_difficulty_set = function(num) {
    var set = new QuestionSet();

    var diff_map = QuestionSet.difficulty_map(this.questions, num);

    for (var i = 0; i < diff_map.length; i++) {
      var q;

      if (diff_map[i].length) {
        var rand_idx = Math.floor(Math.random() * diff_map[i].length);
        q = diff_map[i][rand_idx];
      } else {
        q = this.questions[Math.floor(Math.random() * this.questions.length)];
      }

      set.set_question(q, num - i - 1);
    }

    return set;
  };

  QuestionSet.difficulty_map = function(questions, num) {
    var diff_map = [];
    for (var didx = 0; didx < num; didx++) {
      diff_map.push([]);
    }

    for (var i = questions.length - 1; i >= 0; i--) {
      var q = questions[i];
      var diff = q.get_diffucilty();
      var diff_idx = Math.round(diff * (num - 1));

      diff_map[diff_idx].push(q);
    }

    return diff_map;
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
