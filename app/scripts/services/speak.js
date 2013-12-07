

angular.module('hellbergApp').factory('Speak', ['LOCALE', function(LOCALE) {
  var instance = {}


  instance.speak = function(text) {
    if (!text) {
      return false;
    }

    var audioURL = ['http://www.corsproxy.com/', 'translate.google.com/translate_tts?ie=UTF-8&q=', text , '&tl=', encodeURIComponent(LOCALE.locale)].join('');
    console.log(audioURL);
    var audio = new Audio();

    audio.addEventListener("play", function () {
      console.log('isSpeaking start');
    }, false);

    audio.addEventListener("ended", function () {
      justSpoke = true;
      console.log('isSpeaking end');
    }, false);

    audio.addEventListener("error", function (e) {
      console.log('error', e);
      console.log('isSpeaking end');
    }, false);

    audio.autoplay = true;
    audio.src = audioURL;

    return audio;
  };

  return instance;
}]);
