'use strict';

(function () {
  var INIT_DATA = {
    advertsLength: 8,
    indexLength: 2,
    imagePath: 'img/avatars/user',
    extension: '.png',
    offerTitles: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    types: ['palace', 'flat', 'house', 'bungalo'],
    minPrice: 1000,
    maxPrice: 1000000,
    minRooms: 1,
    maxRooms: 5,
    checks: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    maxCoordX: 900,
    minCoordX: 300,
    maxCoordY: 500,
    minCoordY: 150,
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  };

  var advertsData = window.createData(INIT_DATA);
  var mapEl = document.querySelector('.map');

  mapEl.classList.remove('map--faded');

  var getPins = function (data) {
    var pins = [];

    data.forEach(function (item) {
      var pin = new window.Pin(item);
      pins.push(pin);
    });

    return pins;
  };

  var renderPin = function (data, template) {
    var pinEl = template.cloneNode(true);
    var pinImgEl = pinEl.querySelector('img');
    var pinWidth = pinImgEl.width;
    var pinHeight = pinImgEl.height;

    pinImgEl.src = data.src;
    pinImgEl.alt = data.alt;
    pinEl.style.left = data.location.x + pinWidth / 2 + 'px';
    pinEl.style.top = data.location.y + pinHeight + 'px';

    return pinEl;
  };

  var appendElements = function (data, template, container, renderFunc) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (item) {
      fragment.appendChild(renderFunc(item, template));
    });

    container.appendChild(fragment);
  };

  var pinTemplateEl = document.querySelector('template')
      .content
      .querySelector('.map__pin');
  var mapPinsEl = document.querySelector('.map__pins');
  var pins = getPins(advertsData);

  appendElements(pins, pinTemplateEl, mapPinsEl, renderPin);

  var adverts = [];

  console.log();
})();
