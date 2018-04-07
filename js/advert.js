'use strict';

(function () {
  var INDEX_LENGTH = 2;
  var IMAGE_PATH = 'img/avatars/user';
  var EXTENSION = '.png';
  var OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var CHECKS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var MAX_COORD_X = 900;
  var MIN_COORD_X = 300;
  var MAX_COORD_Y = 500;
  var MIN_COORD_Y = 150;
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  window.Advert = function (index) {
    var _index = index.toString();
    var _indexNum = (_index.length < INDEX_LENGTH) ? ('0' + _index) : _index;

    this.author = {
      avatar: IMAGE_PATH + _indexNum + EXTENSION
    };

    this.location = {
      x: window.Util.getRandomInt(MIN_COORD_X, MAX_COORD_X),
      y: window.Util.getRandomInt(MIN_COORD_Y, MAX_COORD_Y)
    };

    this.offer = {
      title: OFFER_TITLES[index],
      address: this.location.x + ', ' + this.location.y,
      price: window.Util.getRandomInt(MIN_PRICE, MAX_PRICE),
      type: TYPES[window.Util.getRandomInt(0, TYPES.length)],
      rooms: window.Util.getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: window.Util.getRandomInt(MIN_ROOMS, MAX_ROOMS),
      checkin: CHECKS[window.Util.getRandomInt(0, CHECKS.length)],
      checkout: CHECKS[window.Util.getRandomInt(0, CHECKS.length)],
      features: [],
      description: '',
      photos: []
    };
  };
})();
