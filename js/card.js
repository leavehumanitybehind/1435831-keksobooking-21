"use strict";

const MAP_HOUSING_TYPES_TO_RU = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const pinsContainer = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const createFeatures = function (ad) {
  const featuresFragment = document.createDocumentFragment();
  for (let i = 0; i < ad.offer.features.length; i++) {
    const newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`);
    newFeature.classList.add(`popup__feature--` + ad.offer.features[i]);
    featuresFragment.appendChild(newFeature);
  }
  return featuresFragment;
};

const getFeauturesNodes = function (ad, card) {
  const featuresContainer = card.querySelector(`.popup__features`);
  featuresContainer.innerHTML = ``;
  const featuresFragment = createFeatures(ad);
  featuresContainer.appendChild(featuresFragment);
};

const createPhotoMarkup = function (src) {
  const photo = document.createElement(`img`);
  photo.classList.add(`popup__photo`);
  photo.src = `${src}`;
  photo.alt = `Photo`;
  photo.width = `45`;
  photo.height = `40`;
  return photo;
};

const getPhotosNodes = function (photos, card) {
  const photoContainer = card.querySelector(`.popup__photos`);
  photoContainer.innerHTML = ``;
  photos.forEach(function (photo) {
    photoContainer.appendChild(createPhotoMarkup(photo));
  });
};

const disableCard = function () {
  const card = pinsContainer.querySelector(`.map__card`);
  if (card) {
    pinsContainer.removeChild(card);
    card.removeEventListener(`click`, disableCard);
  }
};

const onCardEscPress = function (evt) {
  if (window.util.isEscKeyPress(evt.key)) {
    disableCard();
  }
  document.removeEventListener(`keydown`, onCardEscPress);
};

const renderCard = function (ad) {
  const card = cardTemplate.cloneNode(true);
  const {
    offer: {
      title,
      address,
      price,
      type,
      guests,
      rooms,
      checkin,
      checkout,
      description,
      photos,
      features
    },
    author: {
      avatar
    }
  } = ad;

  if (title) {
    card.querySelector(`.popup__title`).textContent = title;
  }

  if (address) {
    card.querySelector(`.popup__text--address`).textContent = address;
  }

  if (price) {
    card.querySelector(`.popup__text--price`).textContent = price + ` ₽/ночь`;
  }

  if (type) {
    card.querySelector(`.popup__type`).textContent = MAP_HOUSING_TYPES_TO_RU[type];
  }

  if (rooms && guests) {
    if (rooms > 1 && rooms < 5 && guests > 1) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комнаты для ` + guests + ` гостей`;
    }
    if (rooms === 1 && guests === 1) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комната для ` + guests + ` гостя`;
    }
    if (rooms >= 5) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комнат для ` + guests + ` гостей`;
    }

  }

  if (checkin && checkout) {
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + checkin + ` ` + `выезд до ` + checkout;
  }

  if (description) {
    card.querySelector(`.popup__description`).textContent = description;
  }

  if (avatar) {
    card.querySelector(`.popup__avatar`).src = avatar;
  }

  if (photos) {
    getPhotosNodes(photos, card);
  }

  if (features) {
    getFeauturesNodes(ad, card);
  }

  card.querySelector(`.popup__close`).addEventListener(`click`, disableCard);
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};


window.card = {
  render: renderCard,
  disable: disableCard,
};


