'use strict';

(function () {
  var PRICE_DIMENSION = '₽/ночь';

  var typesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var renderCard = function (data, template) {
    var cardEl = template.cloneNode(true);

    cardEl.querySelector('.popup__title').textContent = data.offer.title;
    cardEl.querySelector('.popup__text--address').textContent = data.offer.address;
    cardEl.querySelector('.popup__text--price').textContent = data.offer.price + ' ' + PRICE_DIMENSION;
    cardEl.querySelector('.popup__type').textContent = typesMap[data.offer.type];
    cardEl.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;

    var features = (data.offer.features.length) ? data.offer.features : null;
    var featuresContainerEl = cardEl.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();

    if (features) {
      features.forEach(function (feature) {
        var featureEl = document.createElement('li');

        featureEl.classList.add('popup__feature');
        featureEl.classList.add('popup__feature--' + feature);
        fragment.appendChild(featureEl);
      });

      window.util.drainContainer(featuresContainerEl);
      featuresContainerEl.appendChild(fragment);
    } else {
      window.util.removeElement(featuresContainerEl);
    }

    cardEl.querySelector('.popup__description').textContent = data.offer.description;
    cardEl.querySelector('.popup__avatar').src = data.author.avatar;

    var photos = (data.offer.photos.length) ? data.offer.photos : null;
    var photoContainerEl = cardEl.querySelector('.popup__photos');

    if (photos) {
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
    } else {
      window.util.removeElement(photoContainerEl);
    }

    return cardEl;
  };

  window.renderCard = renderCard;
})();
