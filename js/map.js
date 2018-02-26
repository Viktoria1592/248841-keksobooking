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
  var housingPrice = document.getElementById('price');
  var pinsData;

  function onMapPinsClick(evt) {
    for (var i = 0; i < evt.path.length; i++) {
      if (evt.path[i].classList && evt.path[i].classList.contains('map__pin') && !evt.path[i].classList.contains('map__pin--main')) {
        if (window.map.isCardShown) {
          document.querySelector('.map__card ').remove();
        }

        window.map.isCardShown = true;

        var adCard = window.card.createCard(window.pin.filterPinsData(pinsData)[evt.path[i].dataset.index], mapCard.cloneNode('true'));
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

  function download(evt) {
    window.upload(new FormData(noticeForm), function () {
      noticeForm.reset();
    },
    errorBlock);
    evt.preventDefault();
  }

  function errorBlock(errorMessage) {
    var div = document.createElement('div');
    div.style = 'z-index: 10; margin: 0; text-align: center; background-color: white; border: 3px solid black;';
    div.style.position = 'fixed';
    div.style.width = '50%';
    div.style.height = '70px';
    div.style.paddingTop = '20px';
    div.style.left = '25%';
    div.style.top = '25%';
    div.style.fontSize = '30px';
    div.textContent = errorMessage;
    div.style.color = 'DarkRed';
    document.body.prepend(div);
    setTimeout(function () {
      div.classList.add('hidden');
    }, 2500);
  }

  function init() {
    var dragget;
    window.load(function (response) {
      pinsData = response;
      mapPinMain.addEventListener('mouseup', function (evt) {
        if (!dragget) {
          removeMapFaded();
          removeNoticeFormDisabled();
          removeDisable();

          mapPins.appendChild(window.pin.createPins(pinsData.slice().splice(0, 5)));
          mapPins.addEventListener('click', onMapPinsClick);

          address.value = (evt.clientX) + ', ' + (evt.clientY);
          housingPrice.value = 1000;
          window.pinMove.movePin();
        }
        dragget = true;

        noticeForm.addEventListener('submit', download);
      });
      window.map = {
        pinsData: pinsData,
        isCardShown: isCardShown
      };
    }, errorBlock);
  }

  init();
})();
