/* eslint-disable object-shorthand */
"use strict";

(function () {

  const HOUSING_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const ROOMS = [1, 2, 3, 100];
  const GUESTS = [1, 2, 3, 0];
  const CHECK_INS = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];


  const Price = {
    MIN: 1000,
    MAX: 1000000
  };

  const ADS_NUMBER = 8;

  const getFeautures = function () {
    const feauturesCount = window.util.getRandomNumber(1, FEATURES.length);
    const features = [];
    const feature = window.util.getRandomArrayValue(FEATURES);
    for (let i = 0; i < feauturesCount; i++) {
      if (features.includes(feature)) {
        feature = window.util.getRandomArrayValue(FEATURES);
        features.push(feature);
      }
    }
    return features;
  };

  function getPhotos(photos) {
    const imgs = [];
    for (let i = 0; i < photos.length; i++) {
      imgs.push(`<img src="` + photos[i] + `"class="popup__photo" width="45" height = "40" alt = "Photo">`);
    }
    return imgs;
  }

  const getAds = function (ad) {
    window.util.getRandomNumber(ad);
  };

  const ads = getAds(ADS_NUMBER);

  window.data = {
    getAds: getAds,
    getFeautures: getFeautures,
    getPhotos: getPhotos,
    ADS_NUMBER: ADS_NUMBER,
    ads: ads
  };

})();
