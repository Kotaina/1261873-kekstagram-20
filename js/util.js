'use strict';

(function () {
  var util = {};

  var randomiser = function (start, end) {
    var randomElement = Math.floor(Math.random() * end) + start;
    return randomElement;
  };

  var scrollBlocker = function () {
    document.querySelector('body').classList.add('modal-open');
  };


  var OBJECT_COUNT = 25;
  var COMMENTS_COUNT = 6;


  var KEYCODE = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };


  util.randomiser = randomiser;
  util.scrollBlocker = scrollBlocker;
  util.OBJECT_COUNT = OBJECT_COUNT;
  util.COMMENTS_COUNT = COMMENTS_COUNT;
  util.KEYCODE = KEYCODE;

  window.util = util;
})();

