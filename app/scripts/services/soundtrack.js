'use strict';

angular.module('hellbergApp').factory('Soundtrack', ['SOUNDTRACK', function(SOUNDTRACK) {
  var instance = {
    audio: null,
  };

  var ducking_volume = 0.25;

  var fade = function(audio, interval, ticks, entry_vol, target_vol) {
    if (!audio) {
      return false;
    }

    var tick_interval = interval / ticks;

    var current_tick = -1;
    var tick_cb = function() {
      current_tick++;

      var volume = entry_vol + (target_vol - entry_vol) * (current_tick / ticks);
      audio.volume = volume;

      // console.log("Setting volume", volume);

      if (current_tick < ticks) {
        setTimeout(tick_cb, tick_interval);
      }
    };

    tick_cb();
  };

  var fade_in = function(audio, interval, ticks) {
    return fade(audio, interval, ticks, audio.volume, 1.0);
  };

  var fade_out = function(audio, interval, ticks) {
    return fade(audio, interval, ticks, audio.volume, 0.0);
  };


  instance.duck = function() {
    if (!instance.audio) {
      return false;
    }

    fade(instance.audio, 1000, 10, instance.audio.volume, ducking_volume);
  };

  instance.unduck = function() {
    if (!instance.audio) {
      return false;
    }

    fade(instance.audio, 1000, 10, instance.audio.volume, 1.0);
  };

  instance.stop = function() {
    if (!instance.audio) {
      return false;
    }

    var interval = 1000;

    fade_out(instance.audio, interval, 10);

    setTimeout(function() {
      instance.audio.pause;
    }, interval);
  };

  instance.play = function() {

    var start_time = parseInt(SOUNDTRACK.section.start, 10);


    if (!instance.audio) {
      instance.audio = new Audio();

      instance.audio.addEventListener('play', function () {
        console.log('soundtrack start');
      }, false);

      instance.audio.addEventListener('ended', function () {
        console.log('soundtrack end');
      }, false);

      instance.audio.addEventListener('error', function () {
        console.log('error');
        console.log('soundtrack error');
      }, false);

      instance.audio.addEventListener('canplay', function() {
        instance.audio.currentTime = start_time;
      }, false);

      instance.audio.autoplay = false;
      instance.audio.loop = true;
      instance.audio.src = SOUNDTRACK.url;
    } else {
      instance.audio.currentTime = start_time;
    }

    instance.audio.volume = 0.0;
    instance.audio.play();
    fade_in(instance.audio, 15000, 8);

    return instance.audio;
  };


  return instance;
}]);
