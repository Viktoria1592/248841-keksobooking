'use strict';

(function () {
  var minPriceHousing = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };
  var selectionHousing = document.getElementById('type');
  var housingPrice = document.getElementById('price');
  function onSelectionHousingChange(evt) {
    housingPrice.min = minPriceHousing[evt.target.value];
  }

  var timein = document.getElementById('timein');
  var timeout = document.getElementById('timeout');

  function onTimeinChange(evt) {
    timeout.value = evt.target.value;
  }
  function onTimeoutChange(evt) {
    timein.value = evt.target.value;
  }

  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  function onRoomNumberChange(evt) {
    for (var i = 0; i < 4; i++) {
      if (capacity.children[i].hasAttribute('disabled')) {
        capacity.children[i].removeAttribute('disabled');
      }
    }
    if (evt.target.value === '1') {
      capacity.value = '1';
      capacity.children[0].setAttribute('disabled', 'disabled');
      capacity.children[1].setAttribute('disabled', 'disabled');
      capacity.children[3].setAttribute('disabled', 'disabled');
    } else if (evt.target.value === '2') {
      capacity.value = '2';
      capacity.children[0].setAttribute('disabled', 'disabled');
      capacity.children[3].setAttribute('disabled', 'disabled');
    } else if (evt.target.value === '3') {
      capacity.value = '3';
      capacity.children[3].setAttribute('disabled', 'disabled');
    } else {
      capacity.value = '0';
      capacity.children[0].setAttribute('disabled', 'disabled');
      capacity.children[1].setAttribute('disabled', 'disabled');
      capacity.children[2].setAttribute('disabled', 'disabled');
    }
  }

  roomNumber.addEventListener('change', onRoomNumberChange);
  selectionHousing.addEventListener('change', onSelectionHousingChange);
  timein.addEventListener('change', onTimeinChange);
  timeout.addEventListener('change', onTimeoutChange);
  roomNumber.addEventListener('change', onRoomNumberChange);
})();
