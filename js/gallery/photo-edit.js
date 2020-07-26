'use strict';

(function () {

  var photoEdit = {};

  var effectToggler = window.uploadPhoto.imageUploadOverlay.querySelector('.effect-level__pin');

  var onEffectTogglerMouseUp = function () {
    window.console.log(1);
  };

  effectToggler.addEventListener('mouseup', onEffectTogglerMouseUp);

  window.photoEdit = photoEdit;
})();
