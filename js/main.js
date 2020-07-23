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

  hashtagInput.addEventListener('input', hashtagValidator);

  hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onOverlayEscDown);
  });

  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onOverlayEscDown);
  });

  commentField.addEventListener('focus', function () {
    document.removeEventListener('keydown', onOverlayEscDown);
  });

  commentField.addEventListener('blur', function () {
    document.addEventListener('keydown', onOverlayEscDown);
  });
};

var OnUploadOverlayOpen = function () {
  scrollBlocker();
  imageUploadOverlay.classList.remove('hidden');
  bindListeners();
};

var onOverlayEscDown = function (evt) {
  if (evt.key === KEYCODE.ESC) {
    closeUploadOverlay();
  }
};

uploadButton.addEventListener('change', OnUploadOverlayOpen);

// Хэштеги

var hashtagInput = imageUploadOverlay.querySelector('.text__hashtags');

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


// Фильтр

var effectToggler = imageUploadOverlay.querySelector('.effect-level__pin');

var onEffectTogglerMouseUp = function () {
  console.log('Кнопка отпущена');
};

effectToggler.addEventListener('mouseup', onEffectTogglerMouseUp);

// Валидация комментария
var commentField = imageUploadOverlay.querySelector('.text__description');

var commentLength = commentField.value.length;
var MAX_COMMENT_LENGTH = 140;

if (commentLength > MAX_COMMENT_LENGTH) {
  commentField.setCustomValidity('Комментарий не может превышать 140 символов');
}

