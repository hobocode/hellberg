
var TripLocation = function(options) {
  if (typeof options === 'undefined' || options === null) {
    options = {};
  }

  var defaults = {
    name: null,
    coordinate: {
      lat: 0.0,
      lng: 0.0
    }
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

var Hellberg = window.Hellberg || {};
Hellberg.TripLocation = TripLocation;
window.Hellberg = Hellberg;