'use strict';

(function() {

  /*
   * Wikipedia
   * =========
   * Vårt resmål ligger i ett land med %d innevånare
   * Sök/ersätt {location.name} med "Vårt resmål" i random mening
   *
   * Vi reser mot en stad som grundades av {name} {year}
   * Vår resa tar sin början i en stad som …
   * Vi närmar oss nu vårt resmål, en stad som …
   *
   * Foursquare
   * ==========
   * {venue} is popular {category} at our detination
   *
   */


  // [todo] - Don't add functions to prototype
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

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
      'our point of departure',
      'our starting location'
    ];

  QuestionTemplate.prototype.destination_synonyms = [
      // "Vi är på väg till en ort som",
      // "Vi rör oss mot en ort som",
      'our destination',
      'the destination of our trip'
    ];

  QuestionTemplate.prototype.departure_synonym = function(idx) {
    return this._random_array_idx(this.departure_synonyms, idx);
  };

  QuestionTemplate.prototype.destination_synonym = function(idx) {
    return this._random_array_idx(this.destination_synonyms, idx);
  };

  QuestionTemplate.prototype.location_synonym = function(idx) {

    if (this.location.type === Hellberg.TripLocation.prototype.LOCATION_TYPE_DEPARTURE) {
      return this._random_array_idx(this.departure_synonym, idx);
    }

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
      format: '%s is a popular %s at %s.',
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
    return sprintf(this.format, this.name, this.category.toLowerCase(), this.location_synonym().toLowerCase());
  };




  var FactQuestionTemplate = function(options) {

    if (typeof options === 'undefined' || options === null) {
      options = {};
    }

    QuestionTemplate.call(this, options);

    var defaults = {
      format: '%s'
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

  FactQuestionTemplate.prototype = new QuestionTemplate();
  FactQuestionTemplate.prototype.constructor = QuestionTemplate;

  FactQuestionTemplate.prototype.template_fillers = [
    'Humpty-Dumpty',
    'Schmoodie',
    'Bogus',
    'Hocus Pocus',
    'Rickety Roo'
  ];

  FactQuestionTemplate.prototype.question = function() {

    var shuffle_array = function(o){
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
      return o;
    };

    var params = [
      this.format,
      this.location_synonym()
    ];

    var fillers = this.template_fillers;
    fillers = shuffle_array(fillers);

    params.push.apply(params, fillers);

    var q = sprintf.apply(this, params);
    return q.capitalize();
  };



  var HB = window.Hellberg || {};
  HB.QuestionTemplate = QuestionTemplate;
  HB.VenueQuestionTemplate = VenueQuestionTemplate;
  HB.FactQuestionTemplate = FactQuestionTemplate;
  window.Hellberg = HB;

})();
