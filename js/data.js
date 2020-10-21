/* eslint-disable object-shorthand */
"use strict";

const ROOMS = [1, 2, 3, 100];
const GUESTS = [1, 2, 3, 0];
const CHECK_INS = [`12:00`, `13:00`, `14:00`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const Price = {
  MIN: 1000,
  MAX: 1000000
};

const getFeautures = function (ad, card) {
  const features = card.querySelector(`.popup__features`);
  features.innerHTML = ``;
  const fragmentFeatures = document.createDocumentFragment();
  for (let i = 0; i < ad.offer.features.length; i++) {
    const newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`);
    newFeature.classList.add(`popup__feature--` + ad.offer.features[i]);
    fragmentFeatures.appendChild(newFeature);
  }
  features.appendChild(fragmentFeatures);
};

function getPhotos(photos) {
  const imgs = [];
  for (let i = 0; i < photos.length; i++) {
    imgs.push(`<img src="` + photos[i] + `"class="popup__photo" width="45" height = "40" alt = "Photo">`);
  }
  return imgs;
}


window.data = {
  getFeautures: getFeautures,
  getPhotos: getPhotos,
  ROOMS: ROOMS,
  GUESTS: GUESTS,
  CHECK_INS: CHECK_INS,
  PHOTOS: PHOTOS,
  Price: Price,
};
