'use strict';
// КОНСТАНТЫ
(function () {
  var SIZE_PIN_X = 65;
  var SIZE_PIN_Y = 87;
  var MIN_PIN_Y = 150;
  var MAX_PIN_Y = 500;


  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var commonTemplate = document.querySelector('template');
  var mapCard = commonTemplate.content.querySelector('.map__card');
  var isCardShown = false;
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.getElementById('address');

  var pinsData;

  function onMapPinsClick(evt) {
    for (var i = 0; i < evt.path.length; i++) {
      if (evt.path[i].classList && evt.path[i].classList.contains('map__pin') && !evt.path[i].classList.contains('map__pin--main')) {

        if (isCardShown) {
          document.querySelector('.map__card ').remove();
        }

        isCardShown = true;

        var adCard = window.card.createCard(pinsData[evt.path[i].dataset.index], mapCard.cloneNode('true'));
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

  function movePin() {
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.pageX,
        y: evt.pageY
      };
      var pinStartCoords = {
        x: mapPinMain.offsetLeft,
        y: mapPinMain.offsetTop
      };

      function onMapTokyoMousemove(moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.pageX,
          y: startCoords.y - moveEvt.pageY
        };
        var pinCoords = {
          x: pinStartCoords.x - shift.x,
          y: pinStartCoords.y - shift.y
        };

        if (pinCoords.x < 0) {
          pinCoords.x = 0;
        } else if (pinCoords.x > map.clientWidth) {
          pinCoords.x = map.clientWidth;
        }

        if (pinCoords.y < MIN_PIN_Y) {
          pinCoords.y = MIN_PIN_Y;
        } else if (pinCoords.y > MAX_PIN_Y) {
          pinCoords.y = MAX_PIN_Y;
        }

        mapPinMain.style.top = pinCoords.y + 'px';
        mapPinMain.style.left = pinCoords.x + 'px';
        address.value = (pinCoords.x + SIZE_PIN_X / 2) + ', ' + (pinCoords.y + SIZE_PIN_Y);
      }

      function onMapTokyoMouseup(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMapTokyoMousemove);
        document.removeEventListener('mouseup', onMapTokyoMouseup);
      }

      document.addEventListener('mousemove', onMapTokyoMousemove);
      document.addEventListener('mouseup', onMapTokyoMouseup);
    });
  }

  function init() {
    pinsData = window.data.setarr();
    var dragget;

    mapPinMain.addEventListener('mouseup', function (evt) {
      if (!dragget) {
        removeMapFaded();
        removeNoticeFormDisabled();
        removeDisable();
        mapPins.appendChild(window.pin.createPins(pinsData));

        address.value = (evt.clientX + SIZE_PIN_X / 2) + ', ' + (evt.clientY + SIZE_PIN_Y);

        mapPins.addEventListener('click', onMapPinsClick);

        movePin();
      }
      dragget = true;

    });
  }

  init();
})();
