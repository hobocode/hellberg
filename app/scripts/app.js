'use strict';

angular.module('hellbergApp', [
  'ngRoute',
  'ngAutocomplete',
  'angulartics',
  'angulartics.google.analytics'
])
.constant('LOCALE', {
  lang: 'en',
  locale: 'en_GB'
})
.constant('SOUNDTRACK', {
  url: 'resources/kobenhavns-jernbane-damp-galop.m4a',
  section: {
    start: (60.0 * 1 + 15.0),
    end: (60.0 * 4 + 8.0)     // Not in use at the moment
  }
})
.directive('focusMe', function() {
  return {
    scope: { trigger: '=focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === true) {
          element[0].focus();
          scope.trigger = false;
        }
      });
    }
  };
})
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/trip/:dep_ref/:dest_ref/', {
      templateUrl: 'views/trip.html',
      controller: 'TripCtrl'
    })
    .when('/result/:score/:answer/', {
      templateUrl: 'views/result.html',
      controller: 'ResultCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
