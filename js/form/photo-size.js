'use strict';

(function () {
  var scaleParam = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    MEASURE: '%',
    DEFAULT: 10
  };

  var scale = document.querySelector('.scale');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var fullsizePhoto = document.querySelector('.img-upload__preview');
  var scaleControlValue = parseInt(scaleControlInput.value, scaleParam.DEFAULT);

  var photoSize = {};

  var resetPhotoSize = function () {
    scaleControlInput.value = scaleParam.MAX + scaleParam.MEASURE;
    fullsizePhoto.style.transform = '';
  };

  var setPhotoSize = function (value) {
    scaleControlInput.value = value + scaleParam.MEASURE;
    fullsizePhoto.style.transform = 'scale(' + value / scaleParam.MAX + ')';
  };

  var onScaleButtonClick = function (evt) {
    if (evt.target.classList.contains('scale__control--bigger') && scaleControlValue < scaleParam.MAX) {
      scaleControlValue = scaleControlValue + scaleParam.STEP;
    }

    if (evt.target.classList.contains('scale__control--smaller') && scaleControlValue > scaleParam.MIN) {
      scaleControlValue = scaleControlValue - scaleParam.STEP;
    }

    setPhotoSize(scaleControlValue);
  };

  scale.addEventListener('click', onScaleButtonClick);
  photoSize.resetValues = resetPhotoSize;
  window.photoSize = photoSize;
})();
