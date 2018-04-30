'use strict';

(function () {
  var minPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var housingTypeEl = document.querySelector('#type');
  var housingPriceEl = document.querySelector('#price');
  var timeInEl = document.querySelector('#timein');
  var timeOutEl = document.querySelector('#timeout');
  var roomNumEl = document.querySelector('#room_number');
  var capacityEl = document.querySelector('#capacity');
  var capacityListEl = capacityEl.children;

  var setPriceToType = function () {
    housingPriceEl.min = minPriceMap[housingTypeEl.value];
    housingPriceEl.placeholder = minPriceMap[housingTypeEl.value];
  };

  var onTimeInChange = function () {
    timeOutEl.value = timeInEl.value;
  };

  var onTypeChange = function () {
    setPriceToType();
  };

  setPriceToType();
  timeInEl.addEventListener('change', onTimeInChange);

  var setActiveOptions = function () {
    if (roomNumEl.value !== '100') {
      window.util.forEach(capacityListEl, function (item) {
        item.disabled = (roomNumEl.value >= item.value) ? false : true;
      });

      window.util.forEach(capacityListEl, function (item) {
        if (item.value === '0') {
          item.disabled = true;
        }
      });
    } else {
      window.util.forEach(capacityListEl, function (item) {
        if (item.value === '0') {
          item.disabled = false;
        } else {
          item.disabled = true;
        }
      });
    }
  };

  var setSelectedOption = function () {
    window.util.forEach(capacityListEl, function (item) {
      item.selected = (item.disabled) ? false : true;
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
})();
