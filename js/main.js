'use strict';

var OBJECT_COUNT = 25;

var documentPhotoObjects = [];

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

createPhotoData();
renderPhotoGrid(documentPhotoObjects);
