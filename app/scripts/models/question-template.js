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
  return this.template_string;
};

QuestionTemplate.prototype.departure_synonyms = [
    // "Vår resa tar sin början i en ort som",
    // "Vi lämnar en ort som",
    // "Vi reser från en ort som"
    "our point of departure",
    "our starting location"
  ];

QuestionTemplate.prototype.destination_synonyms = [
    // "Vi är på väg till en ort som",
    // "Vi rör oss mot en ort som",
    "our destination",
    "the destination of our trip"
  ];

QuestionTemplate.prototype.departure_synonym = function(idx) {
  return this._random_array_idx(this.departure_synonyms, idx);
};

QuestionTemplate.prototype.destination_synonym = function(idx) {
  return this._random_array_idx(this.destination_synonyms, idx);
};

QuestionTemplate.prototype._random_array_idx = function(data, idx) {
  if (typeof data === 'undefined' || data === null) {
    data = [];
  }

  if (typeof idx === 'undefined' || idx === null) {
    idx = -1;
  }

  if (data.length) {
    return data[Math.floor(Math.random() * data.length)];
  }
};



var VenueQuestionTemplate = function(options) {

  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  QuestionTemplate.call(this, options);

  var defaults = {
    format: '%s is a popular %s at %s',
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
  return sprintf(this.format, this.name, this.category.toLowerCase(), this.departure_synonym().toLowerCase());
};


var Hellberg = window.Hellberg || {};
Hellberg.QuestionTemplate = QuestionTemplate;
Hellberg.VenueQuestionTemplate = VenueQuestionTemplate;
window.Hellberg = Hellberg;



// vqt = new VenueQuestionTemplate({
//   name: 'Solde',
//   category: 'Cafe'
// });

// console.log(vqt.question());
