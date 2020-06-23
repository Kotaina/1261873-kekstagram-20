'use strict';

var OBJECT_COUNT = 25;

var randomiser = function (start, end) {
  var randomElement = Math.floor(Math.random() * end) + start;
  return randomElement;
};

var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var names = ['Виктор', 'Енисей', 'Святогор', 'Дубрав'];

var userComment = {
  avatar: 'img/avatar-' + randomiser(1, 6) + '.svg',
  message: messages[randomiser(1, 6)],
  name: names[randomiser(1, 4)]
};

var customObject = {
  url: 'photos/' + randomiser(1, 25) + '.jpg',
  description: 'описание',
  likes: randomiser(15, 200),
  comments: userComment
};

var createCustomObject = [];

var pictureList = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture');


for (var i = 0; i < OBJECT_COUNT; i++) {
  var userPhoto = userPictureTemplate.cloneNode(true);
  createCustomObject.push(customObject);
  userPhoto.querySelector('src').value = customObject[i].url;
  userPhoto.querySelector('.picture__likes').textContent = customObject[i].likes;
  userPhoto.querySelector('.picture__comments').textContent = customObject[i].userComment;

  pictureList.appendChild(userPhoto);
}
