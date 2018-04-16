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

  var PRICE_DIMENSION = '₽/ночь';
  var TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var advertsData = window.createData(INIT_DATA);
  var mapEl = document.querySelector('.map');

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

  // appendElements(pins, pinTemplateEl, mapPinsEl, renderPin);

  var getAdverts = function (data) {
    var adverts = [];

    data.forEach(function (item) {
      var advert = new window.Advert(item);
      adverts.push(advert);
    });

    return adverts;
  };

  var clearContainer = function (container) {
    var children = container.querySelectorAll('*');

    for (var i = 0; i < children.length; i++) {
      container.removeChild(children[i]);
    }
  };

  var renderAdvert = function (data, template) {
    var advertEl = template.cloneNode(true);

    advertEl.querySelector('.popup__title').textContent = data.offer.title;
    advertEl.querySelector('.popup__text--address').textContent = data.offer.address;
    advertEl.querySelector('.popup__text--price').textContent = data.offer.price + ' ' + PRICE_DIMENSION;
    advertEl.querySelector('.popup__type').textContent = TYPES[data.offer.type];
    advertEl.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    advertEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;

    var features = data.offer.features;
    var featuresContainerEl = advertEl.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      var featureEl = document.createElement('li');

      featureEl.classList.add('popup__feature');
      featureEl.classList.add('popup__feature--' + feature);
      fragment.appendChild(featureEl);
    });

    clearContainer(featuresContainerEl);
    featuresContainerEl.appendChild(fragment);
    advertEl.querySelector('.popup__description').textContent = data.offer.description;
    advertEl.querySelector('.popup__avatar').src = data.author.avatar;

    var photoContainerEl = advertEl.querySelector('.popup__photos');
    var widthPhoto = photoContainerEl.querySelector('.popup__photo').width;
    var heightPhoto = photoContainerEl.querySelector('.popup__photo').height;

    data.offer.photos.forEach(function (item, i) {
      if (i > 0) {
        var newImg = document.createElement('img');

        newImg.classList.add('popup__photo');
        newImg.width = widthPhoto;
        newImg.height = heightPhoto;
        photoContainerEl.appendChild(newImg);
      }

      photoContainerEl.querySelectorAll('.popup__photo')[i].src = item;
    });

    return advertEl;
  };

  var adverts = getAdverts(advertsData);
  var advertTemplateEl = document.querySelector('template')
      .content
      .querySelector('.map__card');

  var fragment = document.createDocumentFragment();
  var filterContainerEl = document.querySelector('.map__filters-container');

  // fragment.appendChild(renderAdvert(adverts[0], advertTemplateEl));
  // mapEl.insertBefore(fragment, filterContainerEl);
})();
