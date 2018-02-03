var arr = [
{
  "author": {
    "avatar": 'img/avatars/user{{08}}.png'
  },
  "offer": {
    "title": "Неуютное бунгало по колено в воде",
    "address": "{{location.x}}, {{location.y}}",
    "price": 3500,
    "type": 'bungalo',
    "rooms": 3,
    "guests": 3,
    "checkin": '14:00',
    "checkout": '12:00',
    "features": ["wifi", "dishwasher", "parking"],
    "description": '',
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  },

  "location": {
    "x": 333,
    "y": 401
  }
}, {
  "author": {
    "avatar": 'img/avatars/user{{07}}.png'
  },

  "offer": {
    "title": "Уютное бунгало далеко от моря",
    "address": "{{location.x}}, {{location.y}}",
    "price": 7800,
    "type":'bungalo',
    "rooms": 3,
    "guests": 4,
    "checkin": '14:00',
    "checkout": '13:00',
    "features": ["wifi", "parking", "washer", "conditioner"],
    "description": '',
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg"]
  },

  "location": {
    "x": 450,
    "y": 301
  }
}, {
  "author": {
    "avatar": 'img/avatars/user{{06}}.png'
  },

  "offer": {
    "title": "Некрасивый негостеприимный домик",
    "address": "{{location.x}}, {{location.y}}",
    "price": 5200
    "type": 'house',
    "rooms": 2,
    "guests": 3,
    "checkin": '12:00',
    "checkout": '12:00',
    "features": ["wifi", "conditioner"],
    "description": '',
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg", "http://o0.github.io/assets/images/tokyo/hotel1.jpg"]
  },

  "location": {
    "x": 222,
    "y": 12
  }
}, {
  "author": {
    "avatar": 'img/avatars/user{{05}}.png'
  },

  "offer": {
    "title":  "Красивый гостевой домик",
    "address": "{{location.x}}, {{location.y}}",
    "price": 8999,
    "type": 'house',
    "rooms": 5,
    "guests": 6,
    "checkin": '13:00',
    "checkout": '14:00',
    "features": ["wifi", "parking", "washer", "elevator", "conditioner"],
    "description": '',
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  },

  "location": {
    "x": 578,
    "y": 496
  }
}, {
  "author": {
    "avatar": 'img/avatars/user{{04}}.png'
  },

  "offer": {
    "title": "Маленький ужасный дворец",
    "address": "{{location.x}}, {{location.y}}",
    "price": 74000,
    "type": 'bungalo',
    "rooms": 5,
    "guests": 3,
    "checkin": '12:00',
    "checkout": '14:00',
    "features":["wifi", "dishwasher", "parking"]
    "description": '',
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg"]
},

  "location": {
    "x": 237,
    "y": 77
  }
}, {
  "author": {
    "avatar": 'img/avatars/user{{03}}.png'
  },

  "offer": {
    "title": 'Огромный прекрасный дворец',
    "address": "{{location.x}}, {{location.y}}",
    "price": 9999,
    "type": 'flat',
    "rooms": 1,
    "guests": 2,
    "checkin": '12:00',
    "checkout": '12:00',
    "features": ["parking", "elevator", "conditioner"],
    "description": '',
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  },

  "location": {
    "x": 822,
    "y": 333
  }
}, {
  "author": {
    "avatar": 'img/avatars/user{{02}}.png',
  },

  "offer": {
    "title": 'Маленькая неуютная квартира',
    "address": "{{location.x}}, {{location.y}}",
    "price": 560000,
    "type": 'flat',
    "rooms": 2,
    "guests": 1,
    "checkin": '14:00',
    "checkout": '12:00',
    "features": ["wifi", "elevator", "conditioner"],
    "description": '',
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  },

  "location": {
    "x": 750,
    "y": 444
  }
}, {
  "author": {
    "avatar": 'img/avatars/user{{01}}.png',
  },

  "offer": {
    "title": "Большая уютная квартира",
    "address": "{{location.x}}, {{location.y}}"
    "price": 123300
    "type": 'house',
    "rooms": 5,
    "guests": 8,
    "checkin": '14:00',
    "checkout": '14:00',
    "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
    "description": '',
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  },

  "location": {
    "x": 700,
    "y": 499
  }
}];

var map = document.querySelector('.map');
map.classList.remove('.map--faded');