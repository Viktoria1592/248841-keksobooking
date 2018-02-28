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
  var START_PRICE = 1000;
  var pinsData;

  function onMapPinsClick(evt) {
    eventPath(evt);
    for (var i = 0; i < eventPath(evt).length; i++) {
      if (eventPath(evt)[i].classList && eventPath(evt)[i].classList.contains('map__pin') && !eventPath(evt)[i].classList.contains('map__pin--main')) {
        if (window.map.isCardShown) {
          document.querySelector('.map__card ').remove();
        }

        window.map.isCardShown = true;
        var adCard = window.card.createCard(window.pin.filterPinsData(pinsData)[eventPath(evt)[i].dataset.index], mapCard.cloneNode('true'));
        mapFiltersContainer.insertBefore(adCard, mapFiltersContainer.firstChild);
        document.addEventListener('keydown', function (evtClose) {
          if (evtClose.keyCode === 27 && window.map.isCardShown) {
            cardDelete();
          }
        });
        document.querySelector('.popup__close').addEventListener('mousedown', cardDelete);
        document.querySelector('.popup__close').addEventListener('keydown', function (evtClose) {
          if (evtClose.keyCode === 13) {
            cardDelete();
          }
        });
      }
    }
  }

  function cardDelete() {
    document.querySelector('.map__card ').remove();
    window.map.isCardShown = false;
  }

  function eventPath(evt) {
    var path = (evt.composedPath && evt.composedPath()) || evt.path;
    var target = evt.target;

    if (path) {
      return (path.indexOf(window) < 0) ? path.concat(window) : path;
    }

    if (target === window) {
      return [window];
    }

    function getParents(node, memo) {
      memo = memo || [];
      var parentNode = node.parentNode;

      if (!parentNode) {
        return memo;
      } else {
        return getParents(parentNode, memo.concat(parentNode));
      }
    }

    return [target].concat(getParents(target), window);
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
          document.querySelector('.map__filters').reset();

          mapPins.appendChild(window.pin.createPins(window.pin.filterPinsData(pinsData).splice(0, 5)));
          mapPins.addEventListener('click', onMapPinsClick);

          address.value = (evt.clientX) + ', ' + (evt.clientY);
          housingPrice.value = START_PRICE;
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
