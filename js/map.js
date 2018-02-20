'use strict';

(function () {

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

  function init() {
    pinsData = window.data.setarr();
    var dragget;

    mapPinMain.addEventListener('mouseup', function (evt) {
      if (!dragget) {
        removeMapFaded();
        removeNoticeFormDisabled();
        removeDisable();
        mapPins.appendChild(window.pin.createPins(pinsData));

        address.value = (evt.clientX) + ', ' + (evt.clientY);

        mapPins.addEventListener('click', onMapPinsClick);

        window.pinMove.movePin();
      }
      dragget = true;

    });
  }

  init();

  //window.map = {
  //  mapPinMain: mapPinMain,
  //  address: address,
  //  map: map
  //};
})();
