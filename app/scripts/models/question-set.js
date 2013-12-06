
var QuestionSet = function(options) {
  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  var defaults = {
    questions: [],
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

QuestionSet.prototype.questions = function() {
  return this.questions;
};

QuestionSet.prototype.getQuestion = function(idx) {
  return this.questions[idx];
};

QuestionSet.prototype.setQuestion = function(question, idx) {
  return this.questions[idx] = question;
};

QuestionSet.prototype.add = function(question) {
  return this.push(question);
};


var Hellberg = window.Hellberg || {};
Hellberg.QuestionSet = QuestionSet;
window.Hellberg = Hellberg;
