'use strict';

(function () {
  var rangeSlider = document.querySelector('.effect-level');
  var pin = rangeSlider.querySelector('.effect-level__pin');
  var barInput = rangeSlider.querySelector('.effect-level__value');
  var barDepth = rangeSlider.querySelector('.effect-level__depth');
  var slider = {};

  var MAX_PERCENT = 100;

  var initializeSlider = function (callBack) {
    pin.addEventListener('mousedown', function (evt) {
      if (typeof callBack === 'function') {
        onPinMousedown(evt, callBack);
      }
    });
  };

  var resetSliderValues = function () {
    pin.style.left = MAX_PERCENT + '%';
    barDepth.style.width = MAX_PERCENT + '%';
    barInput.value = MAX_PERCENT;
  };

  var updateSliderValues = function (ratio) {
    pin.style.left = (ratio * MAX_PERCENT) + '%';
    barDepth.style.width = (ratio * MAX_PERCENT) + '%';
    barInput.value = Math.round(ratio * MAX_PERCENT);
  };

  var onPinMousedown = function (evt, action) {
    var ratio = null;
    var currentPointX = evt.clientX;
    var parentWidth = evt.target.parentNode.offsetWidth;

    var onMouseMove = function (moveEvent) {
      var pressedX = currentPointX - moveEvent.clientX;
      var passedX = evt.target.offsetLeft - pressedX;

      if (passedX < 0) {
        passedX = 0;
      }

      if (passedX > parentWidth) {
        passedX = parentWidth;
      }

      currentPointX = moveEvent.clientX;
      ratio = passedX / parentWidth;

      updateSliderValues(ratio);
      action(ratio);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  slider.resetValues = resetSliderValues;
  slider.initialize = initializeSlider;
  window.slider = slider;
})();
