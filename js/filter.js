'use strict';

(function () {
  var priceMap = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filtersEl = document.querySelectorAll('.map__filter');

  var filterCbMap = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },

    'housing-rooms': function (data, filter) {
      return true;
    },

    'housing-guests': function (data, filter) {
      return true;
    },

    'housing-features': function (data, filter) {
      return true;
    }
  };

  var filterCb = function (it) {
    return [].every.call(filtersEl, function (filter) {
      return (filter.value === 'any') ? true : filterCbMap[filter.name](it, filter);
    });
  };

  var filterData = function (data) {
    return data.filter(filterCb);
  };

  window.filter = filterData;
})();
