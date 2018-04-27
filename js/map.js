'use strict';

(function () {
  // var INIT_DATA = {
  //   advertsLength: 8,
  //   indexLength: 2,
  //   imagePath: 'img/avatars/user',
  //   extension: '.png',
  //   offerTitles: [
  //     'Большая уютная квартира',
  //     'Маленькая неуютная квартира',
  //     'Огромный прекрасный дворец',
  //     'Маленький ужасный дворец',
  //     'Красивый гостевой домик',
  //     'Некрасивый негостеприимный домик',
  //     'Уютное бунгало далеко от моря',
  //     'Неуютное бунгало по колено в воде'
  //   ],
  //   types: ['palace', 'flat', 'house', 'bungalo'],
  //   minPrice: 1000,
  //   maxPrice: 1000000,
  //   minRooms: 1,
  //   maxRooms: 5,
  //   checks: ['12:00', '13:00', '14:00'],
  //   features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  //   maxCoordX: 900,
  //   minCoordX: 300,
  //   maxCoordY: 500,
  //   minCoordY: 150,
  //   photos: [
  //     'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  //   ]
  // };

  var ENDPOINT_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_URL = ENDPOINT_URL + '/data';
  var PRICE_DIMENSION = '₽/ночь';
  var TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var MAIN_PIN_LINK_HEIGHT = 22;
  var MESSAGE_TIMEOUT = 5000;

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

  var appendElements = function (settings) {
    var fragment = document.createDocumentFragment();

    settings.data.forEach(function (item) {
      fragment.appendChild(settings.renderFunc(item, settings.template));
    });

    settings.container.appendChild(fragment);
  };

  var pinTemplateEl = document.querySelector('template')
      .content
      .querySelector('.map__pin');
  var pinsContainerEl = document.querySelector('.map__pins');
  var pins = null;

  var getAdverts = function (data) {
    var adverts = [];

    data.forEach(function (item) {
      var advert = new window.Card(item);
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

  var adverts = null;
  var advertTemplateEl = document.querySelector('template')
      .content
      .querySelector('.map__card');
  var filterContainerEl = document.querySelector('.map__filters-container');
  var formEl = document.querySelector('.ad-form');
  var formFieldsEl = formEl.querySelectorAll('fieldset');
  var mainPinEl = document.querySelector('.map__pin--main');
  var addressInputEl = formEl.querySelector('#address');

  var activateForm = function () {
    if (formEl.classList.contains('ad-form--disabled')) {
      formEl.classList.remove('ad-form--disabled');
    }

    formFieldsEl.forEach(function (field) {
      field.disabled = false;
    });
  };

  var getPinCoords = function (pin) {
    var leftPos = parseInt(pin.style.left, window.Util.RADIX_TEN);
    var topPos = parseInt(pin.style.top, window.Util.RADIX_TEN);
    var width = parseInt(getComputedStyle(pin).width, window.Util.RADIX_TEN);
    var height = parseInt(getComputedStyle(pin).height, window.Util.RADIX_TEN);

    if (mapEl.classList.contains('map--faded')) {
      return {
        x: leftPos + width / 2,
        y: topPos + height / 2
      };
    } else {
      return {
        x: leftPos + width / 2,
        y: topPos + height + MAIN_PIN_LINK_HEIGHT
      };
    }
  };

  var fillAdress = function () {
    addressInputEl.value = getPinCoords(mainPinEl).x + ', ' + getPinCoords(mainPinEl).y;
  };

  var activateMap = function (options) {
    if (mapEl.classList.contains('map--faded')) {
      mapEl.classList.remove('map--faded');
      appendElements({
        data: options.pins,
        template: options.template,
        container: options.container,
        renderFunc: options.renderFunc
      });
    }
  };

  var onMainPinMouseDown = function () {
    var onMainPinMouseUp = function () {
      activateMap({
        pins: pins,
        template: pinTemplateEl,
        container: pinsContainerEl,
        renderFunc: renderPin
      });
      activateForm();
      mainPinEl.removeEventListener('mouseup', onMainPinMouseUp);
      document.addEventListener('mouseup', onMainPinMouseUp);
    };

    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  var removeCard = function (card) {
    if (card) {
      window.Util.removeElement(card);
    }
  };

  var showAdvertCard = function (evtPin) {
    var mapPinsEl = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPinsEl.forEach(function (pin, i) {
      if (pin === evtPin) {
        mapEl.insertBefore(renderAdvert(adverts[i], advertTemplateEl), filterContainerEl);
      }
    });
  };

  var toggleModal = function (modal) {
    modal.classList.toggle('hidden');
  };

  var onMapPinClick = function (evt) {
    if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
      var advertCardEl = mapEl.querySelector('.map__card');

      removeCard(advertCardEl);
      showAdvertCard(evt.target.parentElement);

      advertCardEl = mapEl.querySelector('.map__card');
      var popupCloseEl = mapEl.querySelector('.popup__close');

      var onCardEscPress = function (escEvt) {
        escEvt.preventDefault();

        if (window.Util.isEscPressed(escEvt)) {
          toggleModal(advertCardEl);
          document.removeEventListener('keydown', onCardEscPress);
        }
      };

      var onPopupCloseClick = function (closeEvt) {
        closeEvt.preventDefault();

        removeCard(advertCardEl);
        document.removeEventListener('keydown', onCardEscPress);
      };

      popupCloseEl.addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onCardEscPress);
    }
  };

  formFieldsEl.forEach(function (field) {
    field.disabled = true;
  });

  var showStatusMessage = function (errorMessage, showTime) {
    var node = document.createElement('div');

    node.id = 'error';
    node.style.position = 'absolute';
    node.style.zIndex = '100';
    node.style.left = 0;
    node.style.right = 0;
    node.style.margin = '0 auto';
    node.style.padding = '5px';
    node.style.fontSize = '24px';
    node.style.color = 'white';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.textContent = errorMessage;

    var prevError = document.querySelector('#error');

    if (prevError) {
      window.Util.removeElement(prevError);
    }

    document.body.insertAdjacentElement('afterbegin', node);

    if (showTime) {
      var timeout = setTimeout(function () {
        window.Util.removeElement(node);
        clearTimeout(timeout);
      }, showTime);
    }
  };

  var onXHRSuccess = function (data) {
    pins = getPins(data);
    adverts = getAdverts(data);

    mainPinEl.addEventListener('mousedown', onMainPinMouseDown);
    pinsContainerEl.addEventListener('click', onMapPinClick);
  };

  var onXHRError = function (errorMessage) {
    showStatusMessage(errorMessage, MESSAGE_TIMEOUT);
  };

  window.backend.load({
    url: LOAD_URL,
    onLoad: onXHRSuccess,
    onError: onXHRError
  });

  fillAdress();
  window.drag(mainPinEl, pinsContainerEl, fillAdress);
})();
