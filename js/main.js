'use strict';

var OBJECT_COUNT = 25;

var mockData = [];
var commentObject = [];

var descriptions = ['Наконец-то дома!', 'Мой типичный день:', 'Воспоминания: 2 года назад', 'Надеюсь веруться'];

var names = ['Виктор', 'Енисей', 'Святогор', 'Дубрав'];

var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var randomiser = function (start, end) {
  var randomElement = Math.floor(Math.random() * end) + start;
  return randomElement;
};

var KEYCODE = {
  ESC: 'Escape',
  ENTER: 'Enter'
};

var generateCommentObject = function () {
  var userComment = {
    avatar: 'img/avatar-' + randomiser(1, 6) + '.svg',
    message: messages[randomiser(1, messages.length)],
    name: names[randomiser(1, names.length)]
  };
  return userComment;
};

var generatePhotoObject = function () {
  var photoObject = {
    url: 'photos/' + randomiser(1, 25) + '.jpg',
    description: descriptions,
    likes: randomiser(15, 200),
    comments: randomiser(1, 10)
  };
  return photoObject;
};

var createPhotosData = function () {
  for (var i = 0; i < OBJECT_COUNT; i++) {
    mockData.push(generatePhotoObject());
    commentObject.push(generateCommentObject());
  }
};

var fillPhotosTemplate = function (photoObject) {
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var userPhoto = userPictureTemplate.cloneNode(true);
  userPhoto.querySelector('.picture__img').src = photoObject.url;
  userPhoto.querySelector('.picture__likes').textContent = photoObject.likes;
  userPhoto.querySelector('.picture__comments').textContent = photoObject.comments;
  return userPhoto;
};

var renderPhotoGrid = function (userPhotoElement) {
  var pictureList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < OBJECT_COUNT; i++) {
    fragment.appendChild(fillPhotosTemplate(userPhotoElement[i]));
  }
  pictureList.appendChild(fragment);
};

createPhotosData();
renderPhotoGrid(mockData);

// Вторая чаасть

var COMMENTS_COUNT = 6;

var openFullPicture = function (photoObject) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoObject.url;
  bigPicture.querySelector('.likes-count').textContent = randomiser(0, 250);
  bigPicture.querySelector('.comments-count').textContent = randomiser(0, 300);
};

var createUserComment = function () {
  var comments = document.querySelector('.social__comment');
  var userComment = comments.cloneNode(true);
  userComment.querySelector('img').src = 'img/avatar-' + randomiser(1, 6) + '.svg';
  userComment.querySelector('img').alt = 'names[randomiser(1, names.length)]';
  userComment.querySelector('.social__text').textContent = messages[randomiser(0, messages.length)];
  return userComment;
};

var generateUsersComments = function (userComment) {
  var commentList = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < COMMENTS_COUNT; i++) {
    fragment.appendChild(createUserComment(userComment[i]));
  }
  commentList.appendChild(fragment);
};

var hideContent = function () {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

var scrollBlocker = function () {
  document.querySelector('body').classList.add('modal-open');
};

openFullPicture(mockData[0]);
createUserComment();
hideContent();
generateUsersComments(commentObject[0]);

// Загрузка файлов

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
};

var openUploadOverlay = function () {
  scrollBlocker();
  imageUploadOverlay.classList.remove('hidden');
  bindListeners();
};

var onOverlayEscDown = function (evt) {
  if (evt.key === KEYCODE.ESC) {
    closeUploadOverlay();
  }
};

uploadButton.addEventListener('change', openUploadOverlay);

// Хэштеги
var hashtagInput = imageUploadOverlay.querySelector('.text__hashtags');

var hashtagValidation = function () {
  var hashtagArray = [];
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_QUANTITY = 5;
  var isExpressionPass = false;
  var isHashtagQuantity = false;
  var isHashtagLengthValidity = false;

  var USER_VALIDITY_MESSAGE = {
    HASHTAG_MIN_LENGTH: 'Хештег должен состоять минимум из двух символов',
    HASHTAG_MAX_LENGTH: 'Длина не может превышать 20 символов',
    HASHTAG_WRONG_SYMBOLS: 'Введены недопустимые знаки',
    HASHTAG_MAX_QUANTITY: 'Максимальное количество хештегов - 5',
    HASHTAG_DUPLICATE: 'Нельзя использовать одинаковые хештеги'
  };

  var hashtagExpressionValidator = function () {
    hashtagArray = hashtagInput.value.split(' ');
    // console.log(hashtagArray);
    var validExpression = /^#[a-zа-яA-ZА-Я0-9]*$/;
    for (var i = 0; i < hashtagArray.length; i++) {
      if (!validExpression.test(hashtagArray[i])) {
        hashtagInput.setCustomValidity(USER_VALIDITY_MESSAGE.HASHTAG_WRONG_SYMBOLS);
      } else {
        hashtagInput.setCustomValidity(' ');
        isExpressionPass = true;
      }
    }
  };

  hashtagExpressionValidator();

  var hashtagQuantityValidator = function () {
    if (hashtagArray.length <= MAX_HASHTAG_QUANTITY) {
      hashtagInput.setCustomValidity(' ');
      isHashtagQuantity = true;
    } else {
      hashtagInput.setCustomValidity(USER_VALIDITY_MESSAGE.HASHTAG_MAX_QUANTITY);
    }
  };

  var hashtagLengthValidator = function () {
    var hashtagLength = hashtagInput.value.length;
    if (hashtagLength < MIN_HASHTAG_LENGTH) {
      hashtagInput.setCustomValidity(USER_VALIDITY_MESSAGE.HASHTAG_MIN_LENGTH);
    } else if (hashtagLength > MAX_HASHTAG_LENGTH) {
      hashtagInput.setCustomValidity(USER_VALIDITY_MESSAGE.HASHTAG_MAX_LENGTH);
    } else {
      hashtagInput.setCustomValidity(' ');
      isHashtagLengthValidity = true;
    }
  };

  var hashtagDuplicateValidator = function () {
    var compareArray = hashtagArray;

    for (var i = 0; i < hashtagArray.length; i++) {
      var cacheElement = hashtagArray[i];
      for (var j = i + 1; j < compareArray.length + 1; j++) {
        if (cacheElement === compareArray[j]) {
          hashtagInput.setCustomValidity(USER_VALIDITY_MESSAGE.HASHTAG_DUPLICATE);
        }
      }
    }
  };

  if (isExpressionPass) {
    hashtagQuantityValidator();
    if (isHashtagQuantity) {
      hashtagLengthValidator();
      if (isHashtagLengthValidity) {
        hashtagDuplicateValidator();
      }
    }
  }
};

hashtagInput.addEventListener('input', hashtagValidation);

hashtagInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onOverlayEscDown);
});

hashtagInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onOverlayEscDown);
});

// Фильтр

var effectToggler = imageUploadOverlay.querySelector('.effect-level__pin');

var onEffectTogglerMouseUp = function () {
  console.log('Кнопка отпущена');
};

effectToggler.addEventListener('mouseup', onEffectTogglerMouseUp);


// Открытие любой фотографии
var fullsizePicture = document.querySelector('.big-picture');
var bigPictureCloseButton = fullsizePicture.querySelector('.big-picture__cancel');

var openBigPicture = function () {
  scrollBlocker();
  fullsizePicture.classList.remove('hidden');
  bigPictureBindListeners();
  thumbnailReader();
};

var pictureURL;

var thumbnailReader = function () {
  var thumbnailPicture = document.querySelector('.picture');
  var thumbNail = thumbnailPicture.cloneNode(true);
  // console.log(thumbNail);
  pictureURL = thumbNail.querySelector('.picture__img').src;
  // console.log(pictureURL);
  // thumbNail.querySelector('.picture__likes').textContent = photoObject.likes;
  // thumbNail.querySelector('.picture__comments').textContent = commentObject.length;
  return thumbNail;
};

var bigPictureBindListeners = function () {
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', bigPictureEscDown);
};

var closeBigPicture = function () {
  fullsizePicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

var bigPictureEscDown = function (evt) {
  if (evt.key === KEYCODE.ESC) {
    closeBigPicture();
  }
};

var thumbnailEnterDown = function (evt) {
  if (evt.key === KEYCODE.ENTER) {
    openBigPicture();
  }
};

var thumbNails = document.querySelectorAll('.picture__img');

var addThumbnailHandler = function () {
  for (var i = 0; i < OBJECT_COUNT; i++) {
    thumbNails[i].addEventListener('click', function () {
      openBigPicture();
    });
  }
};

addThumbnailHandler();
document.addEventListener('keydown', thumbnailEnterDown);

// Валидация комментария
var commentField = imageUploadOverlay.querySelector('.text__description');

var commentValidation = function () {
  var commentLength = commentField.value.length;
  var MAX_COMMENT_LENGTH = 140;

  if (commentLength > MAX_COMMENT_LENGTH) {
    commentField.setCustomValidity('Комментарий не может превышать 140 символов');
  } else {
    commentField.setCustomValidity(' ');
  }
};

var commentValidator = function () {
  commentField.addEventListener('input', commentValidation);
};

commentField.addEventListener('focus', function () {
  document.removeEventListener('keydown', onOverlayEscDown);
});

commentField.addEventListener('blur', function () {
  document.addEventListener('keydown', onOverlayEscDown);
});

commentValidator();
