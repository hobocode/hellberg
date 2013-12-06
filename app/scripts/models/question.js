
Question = function(options) {
  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  var defaults = {
    index: 0,
    question: null,
    answer: null,
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

Question.prototype.score = function() {
  return (this.index + 1) * 2;
};

Question.prototype.question = function() {
  return this.question;
};

Question.prototype.validate_answer = function(answer) {
  return this.answer.validate_answer(answer);
};


// var q = new Question({
//   answer: new Answer({
//     answers: [
//       'Jag heter Gustaf',
//       'Jag heter Simon',
//       'Jag schmeter schumstis',
//     ],
//     index: 4,
//   })
// });

// var r = q.validate_answer('Jag heter Schuzu');
// var s = q.validate_answer('asfoajasoih asuh');

// console.log(r);
// console.log(s);

