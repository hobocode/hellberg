/*
 * Wikipedia
 * =========
 * Vårt resmål ligger i ett land med %d innevånare  (wikipedia)
 * Sök/ersätt {location.name} med "Vårt resmål" i random mening
 *
 * Foursquare
 * ==========
 *
 */



var QuestionTemplate = function(options) {
  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  var defaults = {
    template_string: null,
    location: null,
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
  return this.§;
};

QuestionTemplate.prototype.departure_synonyms = function() {
  return [
    // "Vår resa tar sin början i en ort som",
    // "Vi lämnar en ort som",
    // "Vi reser från en ort som"
    "Vår avfärdsort",
    "Vår utgångsort"
  ];
};

QuestionTemplate.prototype.destination_synonyms = function() {
  return [
    // "Vi är på väg till en ort som",
    // "Vi rör oss mot en ort som",
    "Vårt resmål",
    "Resans mål",
    "Vår destination"
  ];
};



var VenueQuestionTemplate = function(options) {

  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  QuestionTemplate.call(this, options);

  var defaults = {
    format: '%s is a popular %s på %s',
    name: null,
    category: null
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

VenueQuestionTemplate.prototype = new QuestionTemplate();
VenueQuestionTemplate.prototype.constructor = QuestionTemplate;

VenueQuestionTemplate.prototype.question = function() {
  return sprintf(this.format, this.name, this.category, this.departure_synonyms[1]);
};


var Hellberg = window.Hellberg || {};
Hellberg.QuestionTemplate = QuestionTemplate;
Hellberg.VenueQuestionTemplate = VenueQuestionTemplate;
window.Hellberg = Hellberg;
