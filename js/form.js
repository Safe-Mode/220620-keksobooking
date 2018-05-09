'use strict';

(function () {
  var minPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var formEl = document.querySelector('.ad-form');
  var housingTypeEl = formEl.querySelector('#type');
  var housingPriceEl = formEl.querySelector('#price');
  var timeInEl = formEl.querySelector('#timein');
  var timeOutEl = formEl.querySelector('#timeout');
  var roomNumEl = formEl.querySelector('#room_number');
  var capacityEl = formEl.querySelector('#capacity');
  var capacityListEl = capacityEl.children;

  var setPriceToType = function () {
    housingPriceEl.min = minPriceMap[housingTypeEl.value];
    housingPriceEl.placeholder = minPriceMap[housingTypeEl.value];
  };

  var onTimeChange = function (evt) {
    if (evt.target === timeInEl) {
      timeOutEl.value = timeInEl.value;
    } else {
      timeInEl.value = timeOutEl.value;
    }
  };

  var onTypeChange = function () {
    setPriceToType();
  };

  setPriceToType();
  timeInEl.addEventListener('change', onTimeChange);
  timeOutEl.addEventListener('change', onTimeChange);

  var setActiveOptions = function () {
    if (roomNumEl.value !== '100') {
      [].forEach.call(capacityListEl, function (item) {
        item.disabled = (roomNumEl.value >= item.value) ? false : true;
      });

      [].forEach.call(capacityListEl, function (item) {
        if (item.value === '0') {
          item.disabled = true;
        }
      });
    } else {
      [].forEach.call(capacityListEl, function (item) {
        item.disabled = (item.value === '0') ? false : true;
      });
    }
  };

  var setSelectedOption = function () {
    [].forEach.call(capacityListEl, function (item) {
      item.defaultSelected = (item.disabled) ? false : true;
    });
  };

  var setOptionsState = function () {
    setActiveOptions();
    setSelectedOption();
  };

  var onRoomNumChange = function () {
    setOptionsState();
  };

  setOptionsState();
  housingTypeEl.addEventListener('change', onTypeChange);
  roomNumEl.addEventListener('change', onRoomNumChange);

  var resetValues = function () {
    setPriceToType();
    setOptionsState();
  };

  window.form = resetValues;
})();
