
var app = angular.module('hellbergApp').factory('Questions', function() {
  var instance = {}
  instance.fetch = function(departure, destination) {
    return "question";
  };
  return instance;
});
