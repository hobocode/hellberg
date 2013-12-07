'use strict';

angular.module('hellbergApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAutocomplete'
])
  .constant("LOCALE", {
    lang: 'en',
    locale: 'en_US'
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
