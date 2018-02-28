'use strict';

(function () {
  var typeOfHousing = document.getElementById('housing-type');
  var typeOfPrice = document.getElementById('housing-price');
  var numberOfRooms = document.getElementById('housing-rooms');
  var numberOfGuests = document.getElementById('housing-guests');
  var mapPins = document.querySelector('.map__pins');
  var features = document.getElementById('housing-features');
  var arrFeatures = features.getElementsByTagName('input');

  function addPins() {
    mapPins.appendChild(createPins(filterPinsData(window.map.pinsData).splice(0, 5)));
  }

  function filterUpdateHandler() {
    document.querySelectorAll('.map_pin_avatar').forEach(function (pin) {
      pin.remove();
    });
    if (window.map.isCardShown) {
      document.querySelector('.map__card ').remove();
    }
    window.map.isCardShown = false;
    window.debounce(addPins);
  }

  typeOfHousing.addEventListener('change', filterUpdateHandler);
  typeOfPrice.addEventListener('change', filterUpdateHandler);
  numberOfRooms.addEventListener('change', filterUpdateHandler);
  numberOfGuests.addEventListener('change', filterUpdateHandler);

  for (var l = 0; l < arrFeatures.length; l++) {
    arrFeatures[l].addEventListener('change', filterUpdateHandler);
  }

  function filterTypeOfHousing(offerData) {
    if (typeOfHousing.value !== 'any') {
      return offerData.offer.type === typeOfHousing.value;
    } else {
      return true;
    }
  }
  function filterTypeOfPrice(offerData) {
    if (typeOfPrice.value !== 'any') {
      if (typeOfPrice.value === 'middle') {
        return offerData.offer.price < 50000 && offerData.offer.price > 10000;
      } else if (typeOfPrice.value === 'low') {
        return offerData.offer.price <= 10000;
      } else if (typeOfPrice.value === 'high') {
        return offerData.offer.price >= 50000;
      }
    }
    return true;
  }

  function filterNumberOfRooms(offerData) {
    if (numberOfRooms.value !== 'any') {
      return offerData.offer.rooms === +numberOfRooms.value;
    } else {
      return true;
    }
  }
  function filterNumberOfGuests(offerData) {
    if (numberOfGuests.value !== 'any') {
      return offerData.offer.guests === +numberOfGuests.value;
    } else {
      return true;
    }
  }

  function filterFeatures(offerData) {
    for (var j = 0; j < arrFeatures.length; j++) {
      if (arrFeatures[j].checked && !offerData.offer.features.includes(arrFeatures[j].value)) {
        return false;
      }
    }
    return true;
  }

  function filterPinsData(arrPinsData) {
    return arrPinsData.filter(filterTypeOfHousing).filter(filterTypeOfPrice).filter(filterNumberOfRooms).filter(filterNumberOfGuests).filter(filterFeatures);
  }

  function createPins(arrPinsData) {
    var fragmentPin = document.createDocumentFragment();
    var commonTemplate = document.querySelector('template');
    var pinAvatar = commonTemplate.content.querySelector('.map_pin_avatar');

    for (var i = 0; i < arrPinsData.length; i++) {
      var pin = pinAvatar.cloneNode(true);
      pin.dataset.index = i;
      pin.style.left = arrPinsData[i].location.x + 20 + 'px';
      pin.style.top = arrPinsData[i].location.y + 44 + 'px';
      pin.children[0].src = arrPinsData[i].author.avatar;
      fragmentPin.appendChild(pin);
    }
    return fragmentPin;
  }

  window.pin = {
    createPins: createPins,
    filterPinsData: filterPinsData
  };
})();
