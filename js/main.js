'use strict';

(function () {

  const AD_NUMBER = 8;
  const mainPin = document.querySelector(`.map__pin--main`);

  const ads = window.data.getAds(AD_NUMBER);


  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      window.map.activateMap();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.code === window.util.KeyCode.ENTER) {
      window.map.activateMap();
    }
  });


})();

