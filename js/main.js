'use strict';

var OBJECT_COUNT = 25;

var documentPhotoObjects = [];
var documentCommentObject = [];

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

var createPhotoData = function () {
  for (var i = 0; i < OBJECT_COUNT; i++) {
    documentPhotoObjects.push(generatePhotoObject());
    documentCommentObject.push(generateCommentObject());
  }
};

var fillPhotosTemplate = function (photoObject) {
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var userPhoto = userPictureTemplate.cloneNode(true);
  userPhoto.querySelector('.picture__img').src = photoObject.url;
  userPhoto.querySelector('.picture__likes').textContent = photoObject.likes;
  userPhoto.querySelector('.picture__comments').textContent = documentCommentObject.length;
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

createPhotoData();
renderPhotoGrid(documentPhotoObjects);

// Вторая чаасть

var fullSize = function (photoObject) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  // bigPicture.querySelector('.big-picture__img').src = photoObject.url;
  bigPicture.querySelector('.likes-count').textContent = randomiser(0, 250);
  bigPicture.querySelector('.comments-count').textContent = randomiser(0, 300);
};

var usersComment = function () {
  var comments = document.querySelector('.social__comment').content.querySelector('.social-picture');
  var userComment = comments.cloneNode(true).
    userComment.querySelector('img').src = 'img/avatar-' + randomiser(1, 6) + '.svg';
  userComment.querySelector('img').alt = 'names[randomiser(1, names.length)]';
  userComment.querySelector('social__text').textContent = messages[randomiser(1, messages.length)];
  return userComment;
};

var createUsersComment = function (userComment) {
  var commentList = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    fragment.appendChild(usersComment(userComment[i]));
  }
  commentList.appendChild(fragment);
};

var hidingTest = function () {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

document.querySelector('body').classList.add('modal-open');

fullSize();
usersComment();
hidingTest();
createUsersComment();
