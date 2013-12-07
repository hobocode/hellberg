'use strict';

angular.module('hellbergApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAutocomplete'
])
  .constant('LOCALE', {
    lang: 'en',
    locale: 'en_GB'
  })
  .constant('SOUNDTRACK', {
    url: '/resources/kobenhavns-jernbane-damp-galop.m4a',
    section: {
      start: (60.0 * 1 + 15.0),
      end: (60.0 * 4 + 8.0)     // Not in use at the moment
    }
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
      .otherwise({
        redirectTo: '/'
      });
  });
