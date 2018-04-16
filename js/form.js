'use strict';

(function () {
  var formEl = document.querySelector('.ad-form');
  var formFieldsEl = formEl.querySelectorAll('fieldset');
  var mainPinEl = document.querySelector('.map__pin--main');

  var toggleFieldsState = function () {
    if (formEl.classList.contains('ad-form--disabled')) {
      formFieldsEl.forEach(function (field) {
        field.disabled = true;
      });
    } else {
      formFieldsEl.forEach(function (field) {
        field.disabled = false;
      });
    }
  };

  var toggleFormState = function () {
    if (formEl.classList.contains('ad-form--disabled')) {
      formEl.classList.remove('ad-form--disabled');
    } else {
      formEl.classList.add('ad-form--disabled');
    }

    toggleFieldsState();
  };

  var onMainPinMouseUp = function () {
    toggleFormState();
  };

  toggleFieldsState();
  mainPinEl.addEventListener('mouseup', onMainPinMouseUp);
})();
