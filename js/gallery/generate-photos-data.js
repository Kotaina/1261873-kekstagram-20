'use strict';

(function () {
  var photoGridRender = {}; // ОБНОВИТЬ НАЗВАНИЕ

  var descriptions = ['Наконец-то дома!', 'Мой типичный день:', 'Воспоминания: 2 года назад', 'Надеюсь веруться'];

  var names = ['Виктор', 'Енисей', 'Святогор', 'Дубрав'];

  var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var generateCommentObject = function () {
    var userComment = {
      avatar: 'img/avatar-' + window.util.randomiser(1, 6) + '.svg',
      message: messages[window.util.randomiser(1, messages.length)],
      name: names[window.util.randomiser(1, names.length)]
    };
    return userComment;
  };

  var generatePhotoObject = function () {
    var photoObject = {
      url: 'photos/' + window.util.randomiser(1, 25) + '.jpg',
      description: descriptions,
      likes: window.util.randomiser(15, 200),
      comments: window.util.randomiser(1, 10)
    };
    return photoObject;
  };

  var createPhotosData = function () {
    for (var i = 0; i < window.util.OBJECT_COUNT; i++) {
      window.mock.mockData.push(generatePhotoObject());
      window.mock.commentObject.push(generateCommentObject());
    }
  };

  var fillPhotosTemplate = function (photoObject) {
    var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var userPhoto = userPictureTemplate.cloneNode(true);
    var pictureUrl = photoObject.url;
    userPhoto.querySelector('.picture__img').src = pictureUrl;
    userPhoto.querySelector('.picture__likes').textContent = photoObject.likes;
    userPhoto.querySelector('.picture__comments').textContent = photoObject.comments;
    userPhoto.addEventListener('click', function (evt) {
      evt.preventDefault();
      fullSizePicture.src = pictureUrl;
      openBigPicture();
    });
    return userPhoto;
  };

  var renderPhotoGrid = function (userPhotoElement) {
    var pictureList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.util.OBJECT_COUNT; i++) {
      fragment.appendChild(fillPhotosTemplate(userPhotoElement[i]));
    }
    pictureList.appendChild(fragment);
  };

  createPhotosData();
  renderPhotoGrid(window.mock.mockData);

  var openFullPicture = function (photoObject) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoObject.url;
    bigPicture.querySelector('.likes-count').textContent = window.util.randomiser(0, 250);
    bigPicture.querySelector('.comments-count').textContent = window.util.randomiser(0, 300);
  };

  var createUserComment = function () {
    var comments = document.querySelector('.social__comment');
    var userComment = comments.cloneNode(true);
    userComment.querySelector('img').src = 'img/avatar-' + window.util.randomiser(1, 6) + '.svg';
    userComment.querySelector('img').alt = 'names[window.util.randomiser(1, names.length)]';
    userComment.querySelector('.social__text').textContent = messages[window.util.randomiser(0, messages.length)];
    return userComment;
  };

  var generateUsersComments = function (userComment) {
    var commentList = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.util.COMMENTS_COUNT; i++) {
      fragment.appendChild(createUserComment(userComment[i]));
    }
    commentList.appendChild(fragment);
  };

  var hideCommentContent = function () {
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  };

  openFullPicture(window.mock.mockData[0]);
  createUserComment();
  hideCommentContent();
  generateUsersComments(window.mock.commentObject[0]);

  // Открытие любой фотографии
  var fullSizeView = document.querySelector('.big-picture');
  var fullSizeViewCloseButton = fullSizeView.querySelector('.big-picture__cancel');
  var fullSizePictureContainer = document.querySelector('.big-picture__img');
  var fullSizePicture = fullSizePictureContainer.querySelector('img');

  var closeBigPicture = function () {
    fullSizeView.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  var openBigPicture = function () {
    window.util.scrollBlocker();
    fullSizeView.classList.remove('hidden');
    bigPictureBindListeners();
  };

  var bigPictureBindListeners = function () {
    fullSizeViewCloseButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPictureEscDown);
  };

  var onBigPictureEscDown = function (evt) {
    if (evt.key === window.util.KEYCODE.ESC) {
      closeBigPicture();
    }
  };

  var onThumbnailEnterDown = function (evt) {
    if (evt.key === window.util.KEYCODE.ENTER) {
      openBigPicture();
    }
  };

  document.addEventListener('keydown', onThumbnailEnterDown);


  // ---------------------------------------------------------------------------

  window.photoGridRender = photoGridRender;
})();
