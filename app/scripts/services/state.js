angular.module('hellbergApp').factory('State', [function() {
  'use strict';

  var instance = {};
  var _this = this;

  instance.reset = function() {
    instance.dest_ref = null;
    instance.dep_ref = null;
    instance.score = null;
    instance.dep = null;
    instance.dest = null;
  }

  instance.reset();

  return instance;
}]);
