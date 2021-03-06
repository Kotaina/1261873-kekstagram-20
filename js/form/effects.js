'use strict';

(function () {
  var effectsList = document.querySelector('.effects__list');
  var fullsizePhoto = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');
  var defaultEffectItem = effectsList.querySelector('#effect-none');

  var effects = {};
  var slider = window.slider;

  var currentEffect = null;

  var EFFECT = {
    none: {
      className: 'effects__preview--none',
    },
    chrome: {
      type: 'grayscale',
      className: 'effects__preview--chrome',
      min: 0,
      max: 1,
      units: ''
    },
    sepia: {
      type: 'sepia',
      className: 'effects__preview--sepia',
      min: 0,
      max: 1,
      units: ''
    },
    marvin: {
      type: 'invert',
      className: 'effects__preview--marvin',
      min: 0,
      max: 100,
      units: '%'
    },
    phobos: {
      type: 'blur',
      className: 'effects__preview--phobos',
      min: 0,
      max: 3,
      units: 'px'
    },
    heat: {
      type: 'brightness',
      className: 'effects__preview--heat',
      min: 1,
      max: 2,
      units: ''
    }
  };

  var onEffectsListClick = function (evt) {
    slider.resetValues();
    currentEffect = EFFECT[evt.target.value];
    fullsizePhoto.className = 'img-upload__preview ' + currentEffect.className;
    fullsizePhoto.style.filter = '';
    effectSlider.classList.add('hidden');

    if (evt.target.value !== 'none') {
      effectSlider.classList.remove('hidden');
    }
  };

  var resetEffect = function () {
    defaultEffectItem.checked = true;
    fullsizePhoto.className = 'img-upload__preview ' + EFFECT.none.className;
  };

  var setEffect = function (value) {
    if (currentEffect) {
      var filterValue = currentEffect.type + '(' + (value * currentEffect.max + currentEffect.min) + currentEffect.units + ')';
      fullsizePhoto.style.filter = filterValue;
    }
  };

  slider.initialize(setEffect);
  effectsList.addEventListener('change', onEffectsListClick);

  effects.resetValues = resetEffect;
  window.effects = effects;
})();
