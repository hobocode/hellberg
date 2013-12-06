

Question = function(options) {
  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  var defaults = {
    index: 0,
    question: null,
    answers: [],
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

Question.prototype.treshold = 0.9;

Question.prototype.score = function() {
  return (this.index + 1) * 2;
};

Question.prototype.question = function() {
  return this.question;
};

Question.prototype.answers = function() {
  return this.answers;
};

Question.prototype.add_answer = function(answer) {
  return this.answers.push(answer);
};

Question.prototype.evaluate_answer = function(user_answer) {

  var answer_results = [];

  var idx, l, answer;
  for (idx in self.answers) {
    answer = self.answers[idx];

    answer_results.push( new Levenshtein(answer, user_answer) );
  }

  return answer_results;
};

Question.prototype.answer_score = function(answer) {

  var answer_results = self.evaluate_answer(answer);
  var answer_valid = false;
  var best_score = Number.MAX_VALUE;

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

Question.prototype.validate_answer = function(answer) {

  var answer_score = self.answer_score(answer);

  return answer_score < self.score_treshold();
};

Question.prototype.score_treshold = function(answer) {

  if (self.answers.length < 1) {
    return 0;
  }

  var mean_length;
  var total_length = 0;

  var idx;
  for (idx in self.answers) {
    total_length += self.answers[idx].length;
  }

  mean_length = Math.round(total_length / self.answers.length);

  return mean_length * this.treshold;
};
