'use strict';

angular.module('hellbergApp').factory('Soundtrack', ['SOUNDTRACK', function(SOUNDTRACK) {
  var instance = {};

  var fade = function(audio, interval, ticks, entry_vol, target_vol) {

    var tick_interval = interval / ticks;

    var current_tick = -1;
    var tick_cb = function() {
      current_tick++;

      var volume = entry_vol + (target_vol - entry_vol) * (current_tick / ticks);
      audio.volume = volume;

      if (current_tick < ticks) {
        setTimeout(tick_cb, tick_interval);
      }
    };

    tick_cb();
  };

  var fade_in = function(audio, interval, ticks) {
    return fade(audio, interval, ticks, 0.0, 1.0);
  };

  var fade_out = function(audio, interval, ticks) {
    return fade(audio, interval, ticks, 1.0, 0.0);
  };


  instance.play = function() {

    var audio = new Audio();

    audio.addEventListener('play', function () {
      console.log('soundtrack start');
    }, false);

    audio.addEventListener('ended', function () {
      console.log('soundtrack end');
    }, false);

    audio.addEventListener('error', function () {
      console.log('error');
      console.log('soundtrack error');
    }, false);

    audio.addEventListener('canplay', function() {
      audio.currentTime = parseInt(SOUNDTRACK.section.start, 10);
    }, false);

    audio.autoplay = false;
    audio.loop = true;
    audio.src = SOUNDTRACK.url;
    audio.play();

    fade_in(audio, 10000, 8);

    return audio;
  };

  instance.fade_out = fade_out;

  return instance;
}]);
