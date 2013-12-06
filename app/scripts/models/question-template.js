
var QuestionTemplate = function(options) {
  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  var defaults = {
    template_string: null,
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

QuestionTemplate.prototype.template = function() {
  return this.template_string;
};

var Hellberg = window.Hellberg || {};
Hellberg.QuestionTemplate = QuestionTemplate;
window.Hellberg = Hellberg;
