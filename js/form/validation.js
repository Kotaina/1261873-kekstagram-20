'use strict';

(function () {
  var validation = {};

  var hashtagInput = window.uploadPhoto.imageUploadOverlay.querySelector('.text__hashtags');

  var hashtagValidator = function () {
    var USER_VALIDITY_MESSAGE = {
      HASHTAG_MIN_LENGTH: 'Хештег должен состоять минимум из двух символов',
      HASHTAG_MAX_LENGTH: 'Длина не может превышать 20 символов',
      HASHTAG_WRONG_SYMBOLS: 'Введены недопустимые знаки',
      HASHTAG_MAX_QUANTITY: 'Максимальное количество хештегов - 5',
      HASHTAG_DUPLICATE: 'Нельзя использовать одинаковые хештеги',
      MAX_HASHTAG_QUANTITY: 5
    };
    var VALID_EXPRESSION = /^#[a-zа-яA-ZА-Я0-9]*$/;

    var hashtagArray = hashtagInput.value.replace(/ +/g, ' ').trim().toLowerCase().split(' ');

    var isExpressionPass = hashtagArray.every(function (item) {
      return VALID_EXPRESSION.test(item);
    });
    var isHastagsNoDuplicates = hashtagArray.every(function (item, index, array) {
      return array.indexOf(item) === index;
    });

    if (!isHastagsNoDuplicates) {
      hashtagInput.setCustomValidity(USER_VALIDITY_MESSAGE.HASHTAG_DUPLICATE);
    } else {
      hashtagInput.setCustomValidity('');
    }

    if (!isExpressionPass) {
      hashtagInput.setCustomValidity(USER_VALIDITY_MESSAGE.HASHTAG_WRONG_SYMBOLS);
    }

    if (hashtagArray.length > USER_VALIDITY_MESSAGE.MAX_HASHTAG_QUANTITY) {
      hashtagInput.setCustomValidity(USER_VALIDITY_MESSAGE.HASHTAG_MAX_QUANTITY);
    }
  };

  validation.hashtagInput = hashtagInput;
  validation.hashtagValidator = hashtagValidator;

  var commentField = window.uploadPhoto.imageUploadOverlay.querySelector('.text__description');

  var commentLength = commentField.value.length;
  var MAX_COMMENT_LENGTH = 140;

  if (commentLength > MAX_COMMENT_LENGTH) {
    commentField.setCustomValidity('Комментарий не может превышать 140 символов');
  }

  // ----------------------

  validation.commentField = commentField;

  window.validation = validation;
})();
