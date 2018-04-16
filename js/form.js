'use strict';

(function () {
  var formEl = document.querySelector('.ad-form');
  var formFieldsEl = formEl.querySelectorAll('fieldset');
  var mainPinEl = document.querySelector('.map__pin--main');

  var activateForm = function () {
    if (formEl.classList.contains('ad-form--disabled')) {
      formEl.classList.remove('ad-form--disabled');
    }

    formFieldsEl.forEach(function (field) {
      field.disabled = false;
    });
  };

  var onMainPinMouseUp = function () {
    activateForm();
  };

  formFieldsEl.forEach(function (field) {
    field.disabled = true;
  });

  mainPinEl.addEventListener('mouseup', onMainPinMouseUp);
})();
