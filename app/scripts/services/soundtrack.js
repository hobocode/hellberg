


angular.module('hellbergApp').factory('Soundtrack', ['SOUNDTRACK', function(SOUNDTRACK) {
  var instance = {}

  var fade = function(audio, interval, ticks, entry_vol, target_vol) {

    tick_interval = interval / ticks;

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

  var fadeIn = function(audio, interval, ticks) {
    return fade(audio, interval, ticks, 0.0, 1.0);
  };

  var fadeOut = function(audio, interval) {
    return fade(audio, interval, ticks, 1.0, 0.0);
  };


  instance.play = function() {

    var audio = new Audio();

    audio.addEventListener("play", function () {
      console.log('sountrack start');
    }, false);

    audio.addEventListener("ended", function () {
      console.log('sountrack end');
    }, false);

    audio.addEventListener("error", function () {
      console.log('error');
      console.log('sountrack end');
    }, false);

    audio.addEventListener("canplay", function() {
      audio.currentTime = parseInt(SOUNDTRACK.section.start, 10);
    }, false);

    audio.autoplay = false;
    audio.loop = true;
    audio.src = SOUNDTRACK.url;
    audio.play();

    fadeIn(audio, 10000, 8);

    return audio;
  };

  return instance;
}]);
