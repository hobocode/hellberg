
var Answer = function(options) {
  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  var defaults = {
    answers: [],
    threshold: 0.65
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

Answer.prototype.threshold_value = function() {
  return this.threshold;
};

Answer.prototype.answers = function() {
  return this.answers;
};

Answer.prototype.add_answer = function(answer) {
  return this.answers.push(answer);
};

Answer.prototype.evaluate_answer = function(user_answer) {

  var answer_results = [];
  user_answer = user_answer.toLowerCase();

  var l, answer;

  for (var i = 0; i < this.answers.length; i++) {
    answer = this.answers[i];
    answer_results.push( new Levenshtein(answer.toLowerCase(), user_answer) );
  }

  return answer_results;
};

Answer.prototype.answer_score = function(answer) {

  var answer_results = this.evaluate_answer(answer);
  var best_score = Number.MAX_VALUE;

  if (answer_results.length < 1) {
    return best_score;
  }

  var idx;
  for (idx in answer_results) {
    var l = answer_results[idx];

    var score = l.distance;

    if (score < best_score) {
      best_score = score;
    }
  }

  return best_score;
};

Answer.prototype.validate_answer = function(answer) {

  var answer_score = this.answer_score(answer);

  return answer_score < this.score_threshold();
};

Answer.prototype.score_threshold = function(answer) {

  if (this.answers.length < 1) {
    return 0;
  }

  var mean_length;
  var total_length = 0;

  var idx;
  for (idx in this.answers) {
    total_length += this.answers[idx].length;
  }

  mean_length = Math.round(total_length / this.answers.length);

  return mean_length * this.threshold_value();
};

var Hellberg = window.Hellberg || {};
Hellberg.Answer = Answer;
window.Hellberg = Hellberg;
