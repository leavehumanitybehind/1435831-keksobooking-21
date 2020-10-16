/* eslint-disable object-shorthand */
"use strict";

(function () {

  const MapSize = {
    WIDTH: 1200,
    TOP: 130,
    BOTTOM: 630
  };

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

  const getAd = function (adsAmount) {
    const locationX = window.util.getRandomNumber(0, MapSize.WIDTH);
    const locationY = window.util.getRandomNumber(MapSize.TOP, MapSize.BOTTOM);
    const ad = {
      author: {
        avatar: `img/avatars/user0` + (adsAmount + 1) + `.png`
      },
      offer: {
        title: `Заголовок`,
        address: locationX + `,` + locationY,
        price: window.util.getRandomNumber(Price.MIN, Price.MAX) + ` р`,
        type: window.util.getRandomArrayValue(HOUSING_TYPES),
        rooms: window.util.getRandomArrayValue(ROOMS),
        guests: window.util.getRandomArrayValue(GUESTS),
        checkin: window.util.getRandomArrayValue(CHECK_INS),
        checkout: window.util.getRandomArrayValue(CHECK_INS),
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

  const getAds = function (num) {
    const ads = [];
    for (let i = 0; i < num; i++) {
      ads.push(getAd(i));
    }
    return ads;
  };


  window.data = {
    getAds: getAds,
    getFeautures: getFeautures,
    getPhotos: getPhotos,
    HOUSING_TYPES: HOUSING_TYPES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    CHECK_INS: CHECK_INS,
    PHOTOS: PHOTOS,
    Price: Price,
    ADS_NUMBER: ADS_NUMBER,
  };

})();
