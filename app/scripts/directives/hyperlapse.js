
angular.module('hellbergApp')
  .directive('hyperlapse', [function() {

  'use strict';

  return {
    /**
     *
     */
    restrict: 'ECMA',

    /**
     *
     */
    transclude: true,

    /**
     *
     */
    replace: false,

    /**
     *
     */
    template: '<div></div>',

    /**
     *
     */
    scope: {
      route: '=route',                      // required
      width: '=width',                      // required
      play: '=play',                        // required
      height: '=height',                    // required
      maxPoints:'=maxPoints',               // required
      fps: '=fps',                          // required
      lookat: '=lookat',                    // required
      onComplete: '&onComplete',            // required
      onProgress: '&onProgress',            // required
      onRouteComplete: '&onRouteComplete'   // required
    },

    /**
     *
     */
    controller: ['$scope', function ($scope) {
      /**
       * @return the hyperlapse instance
       */
      this.getHyperlapse = function () {
        return $scope.hyperlapse;
      };
    }],

    /**
     *
     * @param scope
     * @param element
     * @param attrs
     */

    link: function (scope, element/*, attrs*/) {
      var el = angular.element(element);

      var max_points = scope.max_points;

      var hyperlapse = new Hyperlapse(el[0], {
        use_lookat: scope.lookat,
        max_points: max_points,
        elevation: 50,
        width: scope.width,
        height: scope.height,
        zoom: 1,
        millis : 10.0/max_points*1000
      });
      /*jshint unused: true*/

      hyperlapse.onLoadProgress = function() {
        if (scope.onProgress) {
          scope.onProgress();
        }
      };

      /*jslint unparam: true*/
      hyperlapse.onError = function(/*e*/) {
        if (scope.onProgress) {
          scope.onProgress();
        }
        // console.log(e);
      };
      /*jslint unparam: false*/

      hyperlapse.onRouteComplete = function() {
        console.log('onRouteComplete', scope.onRouteComplete);
        if (scope.onRouteComplete) {
          scope.onRouteComplete();
        }

        hyperlapse.load();
      };

      hyperlapse.onLoadComplete = function() {
        if (scope.onComplete) {
          scope.onComplete();
        }
      };

      el.addClass('angular-hyperlapse');

      scope.$watch('play', function() {
        if (scope.play) {
          hyperlapse.play();
        } else {
          hyperlapse.pause();
        }
      });

      scope.$watch('route', function() {
        if (scope.route) {
          hyperlapse.generate({route:scope.route});
        }
      });
    }

  };
}]);
