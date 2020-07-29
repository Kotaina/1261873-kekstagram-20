'use strict';

(function () {
  var photoGrid = {};
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture');


  var onLoad = function (photosData) {
    var appPhotos = photosData.map(function (currentValue, index) {
      currentValue.id = index;
      return currentValue;
    });
    renderPhotos(appPhotos);
    window.photosData = photosData;
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var createPhoto = function (photoCard) {
    var picture = pictureTemplate.content.cloneNode(true);

    picture.querySelector('.picture').setAttribute('id', photoCard.id);
    picture.querySelector('.picture__img').src = photoCard.url;
    picture.querySelector('.picture__comments').textContent = photoCard.comments.length;
    picture.querySelector('.picture__likes').textContent = photoCard.likes;

    return picture;
  };

  var dropPhotos = function () {
    var photos = document.querySelectorAll('.picture');
    photos.forEach(function (item) {
      pictures.removeChild(item);
    });
  };

  var renderPhotos = function (photosData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosData.length; i++) {
      fragment.appendChild(createPhoto(photosData[i]));
    }
    pictures.appendChild(fragment);
  };

  photoGrid.renderPhotos = renderPhotos;
  photoGrid.dropPhotos = dropPhotos;
  window.photoGrid = photoGrid;
  window.api.loadData(onLoad, onError);
})();
