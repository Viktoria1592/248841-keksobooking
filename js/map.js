'use strict';
// КОНСТАНТЫ
(function () {
  var SIZE_PIN_X = 65;
  var SIZE_PIN_Y = 65;

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var commonTemplate = document.querySelector('template');
  var mapCard = commonTemplate.content.querySelector('.map__card');
  var isCardShown = false;
  var noticeForm = document.querySelector('.notice__form');

  var pinsData;

  function onMapPinsClick(evt) {
    for (var i = 0; i < evt.path.length; i++) {
      if (evt.path[i].classList && evt.path[i].classList.contains('map__pin') && !evt.path[i].classList.contains('map__pin--main')) {

        if (isCardShown) {
          document.querySelector('.map__card ').remove();
        }

        isCardShown = true;

        var adCard = card.createCard(pinsData[evt.path[i].dataset.index], mapCard.cloneNode('true'));
        mapFiltersContainer.before(adCard);
      }
    }
  }

  function removeMapFaded() {
    map.classList.remove('map--faded');
  }

  function removeNoticeFormDisabled() {
    noticeForm.classList.remove('notice__form--disabled');
  }

  function removeDisable() {
    var fieldset = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      if (fieldset[i].hasAttribute('disabled')) {
        fieldset[i].removeAttribute('disabled');
      }
    }
  }

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

  function init() {
    pinsData = data.setarr();
    var mapPinMain = document.querySelector('.map__pin--main');

    mapPinMain.addEventListener('mouseup', function (evt) {
      removeMapFaded();
      removeNoticeFormDisabled();
      removeDisable();
      mapPins.appendChild(pin.createPins(pinsData));

      var address = document.getElementById('address');
      address.value = (evt.clientX + SIZE_PIN_X / 2) + ', ' + (evt.clientY + SIZE_PIN_Y);

      mapPins.addEventListener('click', onMapPinsClick);
      selectionHousing.addEventListener('change', onSelectionHousingChange);
      timein.addEventListener('change', onTimeinChange);
      timeout.addEventListener('change', onTimeoutChange);
      roomNumber.addEventListener('change', onRoomNumberChange);
    });
  }

  init();
})();
