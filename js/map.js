'use strict';

(function () {
  var ENDPOINT_URL = 'https://js.dump.academy/keksobooking';
  var MAIN_PIN_LINK_HEIGHT = 22;
  var MESSAGE_TIMEOUT = 5000;
  var PINS_COUNT = 5;

  var loadURL = ENDPOINT_URL + '/data';
  var mapEl = document.querySelector('.map');
  var pinsContainerEl = mapEl.querySelector('.map__pins');
  var mapPinsEl;
  var advertsData;

  var getCards = function (data) {
    var cards = [];

    data.forEach(function (item) {
      var advert = new window.Card(item);
      cards.push(advert);
    });

    return cards;
  };

  var advertTemplateEl = document.querySelector('template')
      .content
      .querySelector('.map__card');
  var filterContainerEl = document.querySelector('.map__filters-container');
  var formEl = document.querySelector('.ad-form');
  var formFieldsEl = formEl.querySelectorAll('fieldset');
  var mainPinEl = mapEl.querySelector('.map__pin--main');
  var addressInputEl = formEl.querySelector('#address');

  var mainPinInitCoord = {
    x: mainPinEl.style.left,
    y: mainPinEl.style.top
  };

  var setInitCoords = function (el, coords) {
    el.style.left = coords.x;
    el.style.top = coords.y;
  };

  var activateForm = function () {
    if (formEl.classList.contains('ad-form--disabled')) {
      formEl.classList.remove('ad-form--disabled');

      formFieldsEl.forEach(function (field) {
        field.disabled = false;
      });
    }
  };

  var getPinCoords = function (pin) {
    var leftPos = parseInt(pin.style.left, window.util.RADIX_TEN);
    var topPos = parseInt(pin.style.top, window.util.RADIX_TEN);
    var width = parseInt(getComputedStyle(pin).width, window.util.RADIX_TEN);
    var height = pin.querySelector('img').offsetHeight;

    if (mapEl.classList.contains('map--faded')) {
      return {
        x: Math.round(leftPos + width / 2),
        y: Math.round(topPos + height / 2)
      };
    } else {
      return {
        x: Math.round(leftPos + width / 2),
        y: Math.round(topPos + height + MAIN_PIN_LINK_HEIGHT)
      };
    }
  };

  var fillAdress = function () {
    addressInputEl.value = getPinCoords(mainPinEl).x + ', ' + getPinCoords(mainPinEl).y;
  };

  var activateMap = function (data) {
    if (mapEl.classList.contains('map--faded')) {
      window.renderPins(window.filter(data), PINS_COUNT);
      mapEl.classList.remove('map--faded');
    }
  };

  var onMainPinMouseDown = function () {
    var onMainPinMouseUp = function () {
      window.backend.load({
        url: loadURL,
        onLoad: onXHRSuccess,
        onError: onXHRError
      });

      activateForm();
      document.removeEventListener('mouseup', onMainPinMouseUp);
      mainPinEl.removeEventListener('mousedown', onMainPinMouseDown);
    };

    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  var removeCard = function () {
    var advertCardEl = mapEl.querySelector('.map__card');

    if (advertCardEl) {
      window.util.removeElement(advertCardEl);
    }
  };

  var showCard = function (evtPin) {
    var cards = getCards(window.filter(advertsData));

    mapPinsEl = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPinsEl.forEach(function (pin, i) {
      if (pin === evtPin) {
        mapEl.insertBefore(window.renderCard(cards[i], advertTemplateEl), filterContainerEl);
      }
    });
  };

  var toggleModal = function (modal) {
    modal.classList.toggle('hidden');
  };

  var onMapPinClick = function (evt) {
    var target;

    if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
      target = evt.target;
    }

    if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
      target = evt.target.parentElement;
    }

    if (target) {
      removeCard();
      showCard(target);

      var popupCloseEl = mapEl.querySelector('.popup__close');

      var onCardEscPress = function (escEvt) {
        escEvt.preventDefault();

        if (window.util.isEscPressed(escEvt)) {
          removeCard();
          document.removeEventListener('keydown', onCardEscPress);
        }
      };

      var onPopupCloseClick = function (closeEvt) {
        closeEvt.preventDefault();

        removeCard();
        document.removeEventListener('keydown', onCardEscPress);
      };

      popupCloseEl.addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onCardEscPress);
    }
  };

  formFieldsEl.forEach(function (field) {
    field.disabled = true;
  });

  var setMessageTimeout = function (messageEl, timeout) {
    if (timeout) {
      var timeoutID = setTimeout(function () {
        window.util.removeElement(messageEl);
        clearTimeout(timeoutID);
      }, timeout);
    }
  };

  var showErrorMessage = function (error, showTime) {
    var messageNode = document.createElement('div');

    messageNode.id = 'error';
    messageNode.style.position = 'fixed';
    messageNode.style.zIndex = '100';
    messageNode.style.left = 0;
    messageNode.style.right = 0;
    messageNode.style.margin = '0 auto';
    messageNode.style.padding = '5px';
    messageNode.style.fontSize = '24px';
    messageNode.style.color = 'white';
    messageNode.style.textAlign = 'center';
    messageNode.style.backgroundColor = 'red';
    messageNode.textContent = error;

    var prevError = document.querySelector('#error');

    if (prevError) {
      window.util.removeElement(prevError);
    }

    document.body.insertAdjacentElement('afterbegin', messageNode);
    setMessageTimeout(messageNode, showTime);
  };

  var showSubmitMessage = function (messageNode, timeout) {
    var hideSubmitMessage = function () {
      toggleModal(messageNode);
      clearTimeout(timeoutID);
      document.removeEventListener('keydown', onSubmitMessageEscPress);
    };

    var onSubmitMessageEscPress = function (evt) {
      evt.preventDefault();

      if (window.util.isEscPressed(evt)) {
        hideSubmitMessage();
      }
    };

    toggleModal(messageNode);
    document.addEventListener('keydown', onSubmitMessageEscPress);

    var timeoutID = setTimeout(function () {
      hideSubmitMessage();
    }, timeout);
  };

  var onXHRSuccess = function (data) {
    advertsData = data;
    activateMap(data);
    pinsContainerEl.addEventListener('click', onMapPinClick);
  };

  var onXHRError = function (errorMessage) {
    showErrorMessage(errorMessage, MESSAGE_TIMEOUT);
  };

  fillAdress();
  window.drag(mainPinEl, pinsContainerEl, fillAdress);

  var successModalEl = document.querySelector('.success');
  var avatarEl = document.querySelector('.ad-form-header__preview img');
  var avatarInitSrc = avatarEl.src;
  var photoContainerEl = document.querySelector('.ad-form__photo');

  var disableMap = function () {
    if (!mapEl.classList.contains('map--faded')) {
      removeCard();
      mapEl.classList.add('map--faded');
      filtersEl.reset();
      mapPinsEl = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      mapPinsEl.forEach(function (pin) {
        window.util.removeElement(pin);
      });
    }
  };

  var disableForm = function () {
    formEl.reset();
    formEl.classList.add('ad-form--disabled');
    avatarEl.src = avatarInitSrc;
    window.util.drainContainer(photoContainerEl);

    formFieldsEl.forEach(function (field) {
      field.disabled = true;
    });
  };

  var setInitAppState = function () {
    setInitCoords(mainPinEl, mainPinInitCoord);
    disableForm();
    disableMap();
    fillAdress();
    window.form();
  };

  mainPinEl.addEventListener('mousedown', onMainPinMouseDown);

  formEl.addEventListener('submit', function (evt) {
    var onSubmitSuccess = function () {
      setInitAppState();
      showSubmitMessage(successModalEl, MESSAGE_TIMEOUT);
      mainPinEl.addEventListener('mousedown', onMainPinMouseDown);
    };

    window.backend.save({
      url: ENDPOINT_URL,
      data: new FormData(evt.target),
      onLoad: onSubmitSuccess,
      onError: onXHRError
    });

    evt.preventDefault();
  });

  var formResetEl = document.querySelector('.ad-form__reset');

  formResetEl.addEventListener('click', function (evt) {
    evt.preventDefault();
    setInitAppState();
    mainPinEl.addEventListener('mousedown', onMainPinMouseDown);
  });

  var filtersEl = document.querySelector('.map__filters');

  var updatePins = function () {
    window.renderPins(window.filter(advertsData), PINS_COUNT);
  };

  filtersEl.addEventListener('change', function () {
    window.debounce(updatePins);
  });
})();
