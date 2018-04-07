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

  var adverts = [];

  console.log(advertsData);
})();
