'use strict';
const MapSize = {
  WIDTH: 1200,
  TOP: 130,
  BOTTOM: 630
};

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const Price = {
  MIN: 1000,
  MAX: 1000000
};

const AD_NUMBER = 8;
const HOUSING_TYPES = [`palace`, `flat`, `house`, `bungalow`];

const ROOMS = [1, 2, 3, 100];
const GUESTS = [1, 2, 3, 0];


const CHECK_INS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const pinTemplate = document.querySelector(`#pin`).content;
const mapPin = pinTemplate.querySelector(`.map__pin`);
const pinsContainer = document.querySelector(`.map`).querySelector(`.map__pins`);
// const cardTemplate = document.querySelector(`#card`).content;
const cardElement = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const adFormElements = adForm.querySelectorAll(`fieldset`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFilters = mapFiltersForm.querySelectorAll(`.map__filter`);
const mainPin = pinsContainer.querySelector(`.map__pin--main`);

let isActivate = false;

const KeyCode = {
  ENTER: `Enter`,
  ESCAPE: `Escape`
};

const setFormAttribute = function (array, boolean) {
  array.forEach(function (element) {
    element.setAttribute(`disabled`, boolean);
  });
};

const deleteFormAttribute = function (array) {
  array.forEach(function (element) {
    element.removeAttribute(`disabled`, `disabled`);
  });
};

const changeAttributeState = function () {
  if (!isActivate) {
    setFormAttribute(mapFilters, true);
    setFormAttribute(adFormElements, true);
  } else {
    deleteFormAttribute(mapFilters);
    deleteFormAttribute(adFormElements);
    cardElement.classList.remove(`map--faded`);
    mapFiltersForm.classList.remove(`map__filters--disabled`);
    adForm.classList.remove(`ad-form--disabled`);
  }
};

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArrayValue = function (items) {
  return items[Math.floor(items.length * Math.random())];
};

const getFeautures = function () {
  const feauturesCount = getRandomNumber(1, FEATURES.length);
  const features = [];
  const feature = getRandomArrayValue(FEATURES);
  for (let i = 0; i < feauturesCount; i++) {
    if (features.includes(feature)) {
      feature = getRandomArrayValue(FEATURES);
      features.push(feature);
    }
  }
  return features;
};

const getAd = function (adsAmount) {
  const locationX = getRandomNumber(0, MapSize.WIDTH);
  const locationY = getRandomNumber(MapSize.TOP, MapSize.BOTTOM);
  const ad = {
    author: {
      avatar: `img/avatars/user0` + (adsAmount + 1) + `.png`
    },
    offer: {
      title: `Заголовок`,
      address: locationX + `,` + locationY,
      price: getRandomNumber(Price.MIN, Price.MAX) + ` р`,
      type: getRandomArrayValue(HOUSING_TYPES),
      rooms: getRandomArrayValue(ROOMS),
      guests: getRandomArrayValue(GUESTS),
      checkin: getRandomArrayValue(CHECK_INS),
      checkout: getRandomArrayValue(CHECK_INS),
      features: getFeautures(),
      description: `Строка с описанием`,
      photos: PHOTOS
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return ad;
};

const getAds = function (adsCount) {
  const ads = [];
  for (let i = 0; i < adsCount; i++) {
    ads.push(getAd(i));
  }
  return ads;
};

const createPin = function (ad) {
  const pinsTemplate = mapPin.cloneNode(true);
  const pinX = ad.location.x - (PinSize.WIDTH / 2);
  const pinY = ad.location.y - PinSize.HEIGHT;
  pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
  pinsTemplate.querySelector(`img`).src = ad.author.avatar;
  pinsTemplate.querySelector(`img`).alt = ad.offer.title;

  return pinsTemplate;
};

const createPinFragment = function (ads) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }
  return fragment;
};

const renderPins = function () {
  pinsContainer.appendChild(createPinFragment(ads));
};


/*

function getPhotos(photos) {
  const imgs = [];
  for (let i = 0; i < photos.length; i++) {
    imgs.push(`<img src="` + photos[i] + `"class="popup__photo" width="45" height = "40" alt = "Photo">`);
  }
  return imgs;
}
const createCard = function (ad) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(`.popup__title`).textContent = ad.offer.title;
  card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  card.querySelector(`.popup__text--price`).textContent = ad.offer.price;
  card.querySelector(`.popup__type`).textContent = ad.offer.type;
  card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
  card.querySelector(`.popup__description`).textContent = ad.offer.description;
  card.querySelector(`.popup__avatar`).src = ad.author.avatar;
  card.querySelector(`.popup__photos`).innerHTML = getPhotos(ad.offer.photos);
  return card;
};

const renderCards = function () {\
  const createCardFragment = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 1; i++) {
    fragment.appendChild(createCard(ads[i]));
  }
  return fragment;
};
  cardElement.insertBefore(createCardFragment(), cardElement.querySelector(`.map-filters__container`));

};
*/
const roomNumber = document.querySelector(`#room_number`);
const capacity = document.querySelector(`#capacity`);
capacity.value = roomNumber.value;

const disableOptions = function () {
  for (let i = 0; i < capacity.options.length; i++) {
    capacity.options[i].setAttribute(`disabled`, `disabled`);
  }
};

const disableOption = function (index) {
  capacity.options[index].setAttribute(`disabled`, `disabled`);
};

const resetCapacity = function () {
  for (let i = 0; i < capacity.options.length; i++) {
    capacity.options[i].removeAttribute(`disabled`, `disabled`);
  }
};

const syncRoomsGuests = function () {
  roomNumber.addEventListener(`change`, function () {
    resetCapacity();
    if (roomNumber.value === `100`) {
      capacity.value = 0;
      disableOptions();
    } else if (roomNumber.value === `1`) {
      capacity.value = 1;
      disableOptions();
    } else if (roomNumber.value === `2`) {
      capacity.value = 2;
      disableOption(0);
      disableOption(3);
    } else if (roomNumber.value === `3`) {
      capacity.value = 3;
      disableOption(3);
    }
  });
};

const setAddress = function (pin) {
  const addressInput = adForm.querySelector(`#address`);
  addressInput.value = pin.offsetTop + PinSize.HEIGHT + `,` + (pin.offsetLeft + (PinSize.WIDTH / 2));
  addressInput.textContent = addressInput.value;
};

const ads = getAds(AD_NUMBER);
const activateMap = function () {
  isActivate = true;
  changeAttributeState();
  renderPins(ads);
  setAddress(mainPin);
  syncRoomsGuests();
};

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    activateMap();
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.code === KeyCode.ENTER) {
    activateMap();
  }
});
