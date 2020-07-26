'use strict';

(function () {
  var uploadPhoto = {};

  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadButton = document.querySelector('#upload-file');
  var overlayCloseButton = imageUploadOverlay.querySelector('.img-upload__cancel');

  var closeUploadOverlay = function () {
    imageUploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    uploadButton.value = '';
  };

  var bindListeners = function () {
    document.addEventListener('keydown', onOverlayEscDown);

    overlayCloseButton.addEventListener('click', closeUploadOverlay);

    window.validation.hashtagInput.addEventListener('input', window.validation.hashtagValidator);

    window.validation.hashtagInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', onOverlayEscDown);
    });

    window.validation.hashtagInput.addEventListener('blur', function () {
      document.addEventListener('keydown', onOverlayEscDown);
    });

    window.validation.commentField.addEventListener('focus', function () {
      document.removeEventListener('keydown', onOverlayEscDown);
    });

    window.validation.commentField.addEventListener('blur', function () {
      document.addEventListener('keydown', onOverlayEscDown);
    });
  };

  var onUploadOverlayOpen = function () {
    window.util.scrollBlocker();
    imageUploadOverlay.classList.remove('hidden');
    bindListeners();
  };

  var onOverlayEscDown = function (evt) {
    if (evt.key === window.util.KEYCODE.ESC) {
      closeUploadOverlay();
    }
  };

  uploadButton.addEventListener('change', onUploadOverlayOpen);


  uploadPhoto.imageUploadOverlay = imageUploadOverlay;

  window.uploadPhoto = uploadPhoto;
})();
