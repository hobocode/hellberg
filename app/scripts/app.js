'use strict';

angular.module('hellbergApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/trip', {
        templateUrl: 'views/trip.html',
        controller: 'TripCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });
