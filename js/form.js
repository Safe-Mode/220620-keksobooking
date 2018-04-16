'use strict';

(function () {
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
    var leftPos = parseInt(pin.style.left, 10);
    var topPos = parseInt(pin.style.top, 10);
    var width = parseInt(getComputedStyle(pin).width, 10);
    var height = parseInt(getComputedStyle(pin).height, 10);

    return {
      x: leftPos + width / 2,
      y: topPos + height / 2
    };
  };

  var fillAdress = function () {
    addressInputEl.value = getPinCoords(mainPinEl).x + ', ' + getPinCoords(mainPinEl).y;
  };

  formFieldsEl.forEach(function (field) {
    field.disabled = true;
  });

  fillAdress();

  var onMainPinMouseUp = function () {
    activateForm();
    fillAdress();
  };

  mainPinEl.addEventListener('mouseup', onMainPinMouseUp);
})();
