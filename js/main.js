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
    comments: generateCommentObject()
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
  userPhoto.querySelector('.picture__comments').textContent = commentObject.length;
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
scrollBlocker();

// Загрузка файлов

var imageUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadButton = document.querySelector('#upload-file');
var overlayCloseButton = imageUploadOverlay.querySelector('.img-upload__cancel');

var KEYCODE = {
  ESC: 'Escape',
  ENTER: 'Enter'
};

var closeUploadOverlay = function () {
  imageUploadOverlay.classList.add('hidden');
  uploadButton.value = '';
};
var bindListeners = function () {
  document.addEventListener('keydown', onOverlayEscDown);
  overlayCloseButton.addEventListener('click', closeUploadOverlay);
};

var openBigPicture = function () {
  scrollBlocker();
  imageUploadOverlay.classList.remove('hidden');
  bindListeners();
};

var onOverlayEscDown = function (evt) {
  if (evt.key === KEYCODE.ESC) {
    closeUploadOverlay();
  }
};

uploadButton.addEventListener('change', openBigPicture);

// Хэштеги
var hashtagInput = imageUploadOverlay.querySelector('.text__hashtags');

var hashtagValidation = function () {
  var MIN_HASH_LENGTH = 2;
  var MAX_HASH_LENGTH = 20;
  var hashtagFlag = false;

  var hashtagExpressionValidator = function () {
    var hashtagArray = hashtagInput.value.split(' ');
    for (var i = 0; i < hashtagArray.length; i++) {
      var validExpression = /^#[a-zа-яA-ZА-Я0-9]*$/;
      if (!validExpression.test(hashtagArray[i])) {
        hashtagInput.setCustomValidity('Введены недопустимые знаки');
      } else {
        hashtagInput.setCustomValidity(' ');
        hashtagFlag = true;
      }
    }
  };

  var hashtagLengthValidator = function () {
    var hashtagLength = hashtagInput.value.length;
    if (hashtagLength < MIN_HASH_LENGTH) {
      hashtagInput.setCustomValidity('Хештег должен состоять минимум из двух символов');
    } else if (hashtagLength > MAX_HASH_LENGTH) {
      hashtagInput.setCustomValidity('Длина не может превышать 20 символов');
    } else {
      hashtagInput.setCustomValidity(' ');
    }
  };


  hashtagExpressionValidator();

  if (hashtagFlag) {
    hashtagLengthValidator();
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

var effectTogglerMoving = function () {
  console.log('Кнопка отпущена');
};

effectToggler.addEventListener('mouseup', effectTogglerMoving);
